<h1 align="center">
📄<br>IMOVEIS APP
</h1>

<h3>Back-End (Django)</h3>
<p>Necessário compatibilidadade com python 3.10</p>
<p>Utiliza porta 8000 por padrão</p>
<h4>Instalação</h4>
<p>Ao fim desta seção existe um compilado dos comandos justificados no README</p>
<p>Utilizando o python 3.10 abra a pasta do projeto no terminal vamos criar o ambiente virtual</p>
<b><p>cd server</p>
<p>py venv .venv</p></b>
<p>Isso irá criar um ambiente virtual para que possamos instalar as dependencias necessárias para o projeto nele, mas ainda precisamos ativar ele</p>
<b><p>.venv\Scripts\activate</p></b>
<p>Se tudo estiver certo você verá um "(.venv)" ao lado do caminho no seu terminal, agora iremos instalar as dependencias necessárias</p>
<p>Ainda com na pasta server, e com o venv ativo</p>
<b><p>pip install -r requirements.txt</p></b>
<p>Após isso basta aguardar e então as dependencias necessarias serão baixadas. Ao finalizar a instalação devemos migrar o banco</p>
<b><p>cd imoveisapi</p></b>
<b><p>py manage.py makemigrations</p></b>
<b><p>py manage.py migrate</p></b>
<p>Com isso temos nossa instalação pronta para rodar</p>
<b><p>py manage.py runserver</p></b>

<h5>Comandos</h5>
<b><p>cd server</p>
<p>py venv .venv</p>
<p>cd imoveisapi</p>
<p>py manage.py makemigrations</p>
<p>py manage.py migrate
<p>py manage.py runserver</p></b>

<h5>Extra</h5>
<p>O Django dispõe de uma interface de admin que permite acesso direto ao banco, mas para utiliza-la é necessario criar um superusario</p>
<p>Isso pode ser facilmente resolvido usando</p>
<b><p>py manage.py createsuperuser</p></b>
<p>Após preencher os dados solicitados se pode acessar usando 127.0.0.1:8000/admin</p>

<h3>Front-End (Angular)</h3>

<p>Utiliza o instalador de pacotes Node.js</p>
<p>Utiliza porta 4200 por padrão, configurações de CORS do back-end estão configuradas somente para esta porta</p>

<h4>Instalação</h4>

<p>Vamos começar abrindo a pasta do projeto pelo terminal</p>
<b><p>cd client\ImoveisFrontEnd</p>
<p>Após isso vamos instalar as dependencias necessárias</p>
<b><p>npm install</p></b>
<p>E agora podemos rodar o programa</p>
<b><p>ng serve</p></b>



