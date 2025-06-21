const formReceita = document.getElementById('form-receita');
const responseMessage = document.getElementById('response-message');
const listaReceitas = document.getElementById('lista-receitas');

async function carregarReceitas() {
  try {
    const res = await fetch('http://127.0.0.1:8000/receitas');
    if (!res.ok) throw new Error('Erro ao buscar receitas');
    const receitas = await res.json();

    listaReceitas.innerHTML = '';

    if (receitas.length === 0) {
      listaReceitas.innerHTML = '<li>Você ainda não cadastrou nenhuma receita.</li>';
      return;
    }

    receitas.forEach(receita => {
      const li = document.createElement('li');

      const ingredientes = receita.ingredientes.join(', ');

      li.innerHTML = `
        <h3>${receita.nome}</h3>
        <p><strong>Ingredientes:</strong> ${ingredientes}</p>
        <p><strong>Modo de preparo:</strong> ${receita.modo_preparo}</p>
        <button class="delete-btn" data-id="${receita.id}">Excluir</button>
      `;

      listaReceitas.appendChild(li);
    });

    // Botões excluir
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        try {
          const res = await fetch(`http://127.0.0.1:8000/receitas/${id}`, { method: 'DELETE' });
          if (!res.ok) throw new Error('Erro ao deletar receita.');
          responseMessage.textContent = "Receita excluída com sucesso!";
          responseMessage.style.color = "green";
          carregarReceitas();
        } catch (error) {
          responseMessage.textContent = error.message;
          responseMessage.style.color = "red";
        }
      });
    });

  } catch (error) {
    listaReceitas.innerHTML = `<li style="color:red;">${error.message}</li>`;
  }
}

formReceita.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = formReceita.nome.value.trim();
  const ingredientes = formReceita.ingredientes.value.split(',').map(i => i.trim()).filter(Boolean);
  const modo_preparo = formReceita.modo_preparo.value.trim();

  if (!nome || ingredientes.length === 0 || !modo_preparo) {
    responseMessage.textContent = "Preencha todos os campos corretamente.";
    responseMessage.style.color = "red";
    return;
  }

  try {
    const res = await fetch('http://127.0.0.1:8000/receitas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, ingredientes, modo_preparo }),
    });
    if (!res.ok) throw new Error('Erro ao cadastrar receita');

    responseMessage.textContent = "Receita cadastrada com sucesso!";
    responseMessage.style.color = "green";

    formReceita.reset();
    carregarReceitas();
  } catch (error) {
    responseMessage.textContent = error.message;
    responseMessage.style.color = "red";
  }
});

// Carrega receitas na inicialização
carregarReceitas();
