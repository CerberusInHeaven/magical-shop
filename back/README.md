# Como rodar ? <br >

Com o projeto já clonado vá para a pasta /back, e abra o cmd\editor de código <br> 

```
npm install --force <br> (existe um bug na caceta do claudionary no back-end que sinceramente... preeguiça de arrumar :p) <br>
npx prisma generate 
<br>(Gera as execuções que o Prisma ira executar para criar as tabelas do banco de dados ) <br>
npx prisma migrate dev --name "nome aqui sem aspas" <br> (Executa os commandos do prisma no banco de dados que você utiliza no .env)
npm run dev <br>(Executa o back-end e por fim reflete no seu .env.local para renderizar os dados no front-end :) )

```
