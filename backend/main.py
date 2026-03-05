import os
from fastapi import FastAPI , HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel , Field
from typing import List
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

app=FastAPI(title="AI Autocorrect API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CorrectionRequest(BaseModel):
    text:str
    tone:str

class CorrectionResponse(BaseModel):
    corrected_text: str = Field(desciption="The fully corrected and refined version of the input text.")
    key_changes: List[str] = Field(description="A list of 2 to 3 short phrases describing the changes made, e.g., 'Fixed Grammar', 'Tone Adjusted to Formal'.")

llm=ChatGroq(model="llama-3.3-70b-versatile", temperature=0.8)

structured_llm = llm.with_structured_output(CorrectionResponse)

system_prompt = """You are an expert copyeditor and writing assistant.
Your job is to take the user's rough draft and rewrite it to be perfectly fluent and accurate.
You must adjust the text to match the requested tone: {tone}.

Keep the original meaning intact, but fix all grammar, spelling, and punctuation errors.
"""

prompt_template= ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("user", "Here is my draft:\n\n{text}")
])

chain= prompt_template | structured_llm

@app.post("/api/correct", response_model=CorrectionResponse)
async def correct_text(request:CorrectionRequest):
    try:
        print(f"Incoming request: {request.text[:20]}... Tone: {request.tone}")
        result=chain.invoke({
            "text":request.text,
            "tone":request.tone
        })

        return result
    except Exception as e:
        print(f"Error processing text : {e}")
        raise HTTPException(status_code=500,detail=str(e))
