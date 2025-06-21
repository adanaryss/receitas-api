from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Permitir chamadas do frontend (se rodar em localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # para testes locais, permita tudo, em produção restrinja
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Receita(BaseModel):
    id: int = None
    nome: str
    ingredientes: List[str]
    modo_preparo: str

receitas = []
next_id = 1

@app.get("/receitas", response_model=List[Receita])
def listar_receitas():
    return receitas

@app.post("/receitas", response_model=Receita)
def criar_receita(receita: Receita):
    global next_id
    receita.id = next_id
    next_id += 1
    receitas.append(receita.dict())
    return receita

@app.delete("/receitas/{receita_id}")
def deletar_receita(receita_id: int):
    global receitas
    for i, r in enumerate(receitas):
        if r["id"] == receita_id:
            receitas.pop(i)
            return {"message": "Receita deletada com sucesso"}
    raise HTTPException(status_code=404, detail="Receita não encontrada")
