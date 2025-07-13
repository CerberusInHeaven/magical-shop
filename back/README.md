# Como rodar ? <br >

Com o projeto já clonado vá para a pasta >back, e abra o cmd\editor de código <br> 

```
npm install --force (existe um bug em uma das techs utilizadas no back-end que sinceramente... preeguiça de arrumar :p) <br>
npx prisma generate (Gera as execuções que o Prisma ira executar para criar as tabelas do banco de dados ) <br>
npx prisma migrate dev --name "nome aqui sem aspas" (Executa os commandos do prisma no banco de dados que você utiliza no .env) 

```
