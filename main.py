from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    question: str
    options: list
    answer: str

# 一般常識に関するクイズ問題
questions = [
    {
        "question": "地球はどの惑星系に属していますか？",
        "options": ["A. 太陽系", "B. 銀河系", "C. 星間系", "D. 火星系"],
        "answer": "A"
    },
    {
        "question": "日本の首都はどこですか？",
        "options": ["A. 大阪", "B. 東京", "C. 名古屋", "D. 京都"],
        "answer": "B"
    },
    {
        "question": "最も長い川はどれですか？",
        "options": ["A. アマゾン川", "B. ナイル川", "C. 長江", "D. ミシシッピ川"],
        "answer": "B"
    },
    {
        "question": "最も多くの国が使用する言語はどれですか？",
        "options": ["A. 英語", "B. スペイン語", "C. 中国語", "D. フランス語"],
        "answer": "A"
    },
    {
        "question": "人間の体で最も大きな臓器はどれですか？",
        "options": ["A. 心臓", "B. 肝臓", "C. 腎臓", "D. 胃"],
        "answer": "B"
    }
]

@app.get("/question/{index}")
async def get_question(index: int):
    if index < len(questions):
        return questions[index]
    return {"question": "終了", "options": [], "answer": ""}
