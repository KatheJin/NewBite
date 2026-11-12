package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.Header().Set("Cache-Control", "no-store")

		response := map[string]string{
			"service": "newbite-api",
			"status":  "ok",
		}

		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Printf("write health response: %v", err)
		}
	})

	server := &http.Server{
		Addr:              "127.0.0.1:8080",
		Handler:           mux,
		ReadHeaderTimeout: 5 * time.Second,
	}

	log.Printf("Starting NewBite API at http://%s", server.Addr)
	log.Fatal(server.ListenAndServe())
}
