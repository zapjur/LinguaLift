package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

type UserInput struct {
	Sentence string `json:"sentence"`
	Language string `json:"language"`
}

type InputRequest struct {
	UserInput UserInput `json:"user_input"`
}

type Correction struct {
	Error       string `json:"error"`
	Correction  string `json:"correction"`
	Explanation string `json:"explanation"`
}

type ChatResponse struct {
	ResponseText string `json:"response_text"`
}

type FullResponse struct {
	UserInput    UserInput    `json:"user_input"`
	ChatResponse ChatResponse `json:"chat_response"`
	Errors       []Correction `json:"errors"`
}

type OpenAIResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}

func callOpenAIAPI(prompt string) (FullResponse, error) {
	apiURL := "https://api.openai.com/v1/chat/completions"
	apiKey := os.Getenv("OPENAI_API_KEY")

	requestBody, err := json.Marshal(map[string]interface{}{
		"model": "gpt-3.5-turbo",
		"messages": []map[string]string{
			{
				"role":    "system",
				"content": "You are a helpful assistant.",
			},
			{
				"role":    "user",
				"content": prompt,
			},
		},
		"max_tokens": 200,
	})
	if err != nil {
		return FullResponse{}, err
	}

	req, err := http.NewRequest(http.MethodPost, apiURL, bytes.NewBuffer(requestBody))
	if err != nil {
		return FullResponse{}, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", apiKey))

	client := http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return FullResponse{}, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return FullResponse{}, err
	}

	fmt.Println("Raw response from OpenAI:", string(body))

	var openAIResponse OpenAIResponse
	err = json.Unmarshal(body, &openAIResponse)
	if err != nil {
		return FullResponse{}, err
	}

	if len(openAIResponse.Choices) == 0 {
		return FullResponse{}, fmt.Errorf("no choices returned from OpenAI")
	}

	var fullResponse FullResponse
	err = json.Unmarshal([]byte(openAIResponse.Choices[0].Message.Content), &fullResponse)
	if err != nil {
		return FullResponse{}, err
	}

	return fullResponse, nil
}

func handleInput(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var input InputRequest
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	prompt := fmt.Sprintf(`
You are helping a student learn %s. The student sent the following sentence: "%s"
1. Reply naturally in %s, addressing the student's input and continuing the conversation, but do not explicitly mention any grammatical errors in this response.
2. After replying, identify any grammatical or spelling errors separately, correct them, and briefly explain each correction in a friendly tone.
3. Return the information in the following JSON format:
{
  "user_input": {
    "sentence": "%s",
    "language": "%s"
  },
  "chat_response": {
    "response_text": "Your full conversational response here, without mentioning errors."
  },
  "errors": [
    {
      "error": "Error1",
      "correction": "CorrectedVersion1",
      "explanation": "Explanation1"
    },
    {
      "error": "Error2",
      "correction": "CorrectedVersion2",
      "explanation": "Explanation2"
    }
  ]
}`, input.UserInput.Language, input.UserInput.Sentence, input.UserInput.Language, input.UserInput.Sentence, input.UserInput.Language)

	chatResponse, err := callOpenAIAPI(prompt)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(chatResponse); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}

}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "POST")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {

	mux := http.NewServeMux()
	mux.HandleFunc("/input", handleInput)

	handler := corsMiddleware(mux)

	fmt.Println("Server is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", handler))

}
