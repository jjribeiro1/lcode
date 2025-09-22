# LCode

Este projeto contém exercícios desenvolvidos com NestJS.

## Como rodar o projeto

### Pré-requisitos

- Git
- Docker
- Docker Compose

### Instruções

**Passo 1:** Clone o projeto

```bash
git clone https://github.com/jjribeiro1/lcode.git
cd lcode
```

**Passo 2:** Execute o projeto com Docker Compose

```bash
docker-compose up -d
```

Isso irá executar as duas aplicações:

- **Exercício 1**: Disponível na porta `3000` (http://localhost:3000)
  - Documentação Swagger: http://localhost:3000/api/docs
- **Exercício 2**: Disponível na porta `4000` (http://localhost:4000)

## Exercício 1 - Sistema de Empacotamento

### Estratégia de Resolução

A solução utilizada combina características dos algoritmos FFD (First Fit Decreasing) e BFD (Best Fit Decreasing). Os produtos são ordenados por volume (FFD), a menor caixa possível é selecionada para o primeiro produto (BFD) e, em seguida, a caixa é preenchida com outros produtos que caibam respeitando um fator de eficiência de 70%. O processo segue as seguintes etapas:

1. **Ordenação por Volume**: Os produtos são organizados do maior para o menor volume

2. **Seleção da Melhor Caixa**: Para cada produto, o algoritmo busca a **menor caixa** que consegue acomodá-lo geometricamente. Isso evita usar caixas grandes desnecessariamente para produtos pequenos.

3. **Verificação Geométrica**: O produto precisa caber fisicamente na caixa. Para isso, as dimensões são ordenadas (menor para maior) tanto do produto quanto da caixa, garantindo que o produto pode ser rotacionado para se encaixar.

4. **Preenchimento da caixa**: Após achar uma caixa para o primeiro produto, o algoritmo tenta preencher o espaço restante com outros produtos menores, respeitando um fator de eficiência de 70%.

5. **Tratamento de Casos Especiais**: Produtos que não cabem em nenhuma caixa disponível são sinalizados com uma observação específica, mantendo a transparência do processo.

### Exemplo de Uso da API

**Caixas Disponíveis:**
- **Caixa 1**: 30cm × 40cm × 80cm (volume: 96.000 cm³)
- **Caixa 2**: 50cm × 50cm × 40cm (volume: 100.000 cm³)
- **Caixa 3**: 50cm × 80cm × 60cm (volume: 240.000 cm³)

**Endpoint:** `POST /api/packing`

**Entrada:**
```json
{
  "pedidos": [
    {
      "pedido_id": 1,
      "produtos": [
        {
          "produto_id": "PROD001",
          "dimensoes": {
            "altura": 10,
            "largura": 20,
            "comprimento": 30
          }
        },
        {
          "produto_id": "PROD002",
          "dimensoes": {
            "altura": 5,
            "largura": 10,
            "comprimento": 15
          }
        }
      ]
    }
  ]
}
```

**Saída:**
```json
{
  "pedidos": [
    {
      "pedido_id": 1,
      "caixas": [
        {
          "caixa_id": "Caixa 1",
          "produtos": ["PROD001", "PROD002"]
        }
      ]
    }
  ]
}
```

### Por que essa Abordagem?

- **Simplicidade**: Fácil de entender e manter
- **Eficiência prática**: Utilização de princípios dos algoritmos FFD e BFD para reduzir o número de caixas sem complexidade excessiva
- **Realismo**: Considera rotações de produtos e fator de eficiência para simular um empacotamento real
- **Flexibilidade**: Permite ajustes no fator de eficiência conforme necessário

### Testes

A lógica principal de empacotamento é coberta por **testes unitários** que validam:
- Empacotamento de produto único na menor caixa compatível
- Combinação de múltiplos produtos na mesma caixa quando possível
- Uso de múltiplas caixas quando produtos não cabem juntos
- Tratamento de produtos que não cabem em nenhuma caixa disponível
- Processamento correto de múltiplos pedidos independentes
