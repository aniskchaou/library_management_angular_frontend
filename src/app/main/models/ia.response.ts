// Define interfaces for the response structure
export interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Choice[];
    usage: Usage;
}

export interface Choice {
    index: number;
    message: Message;
    logprobs: any; // Replace with appropriate type if known
    finish_reason: string;
}

export interface Message {
    role: string;
    content: string;
    refusal: any; // Replace with appropriate type if known
}

export interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_tokens_details: {
        cached_tokens: number;
    };
    completion_tokens_details: {
        reasoning_tokens: number;
    };
}