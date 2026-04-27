# Eggdata
## Como Rodar o Projeto

1. **Clonar o repositório** e abrir na sua IDE (IntelliJ/VSCode).

2. **Executar a aplicação**: O `DbSeeder` criará automaticamente o usuário `eggman` (ID 1), óbviamente o Dr merece ser o primeiro a ser criado em seu próprio sistema.

3. **Importar o arquivo de requisições**:
   - Abra o Insomnia.
   - Clique em `Import` -> `File`.
   - Selecione o arquivo `EggmanEmpire_API_Requests.yaml` na raiz do projeto.
4. **Testar os Planos**:
   - Note que as requisições de Planos exigem o Header `X-User-Id`.
   - O valor padrão configurado é `1` (Dr. Eggman).