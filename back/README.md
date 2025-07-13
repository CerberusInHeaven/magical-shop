# Como rodar ? <br >

Com o projeto já clonado vá para a pasta /back, e abra o cmd\editor de código <br> 

```
npm install --force (existe um bug na caceta do claudionary no back-end que sinceramente... preeguiça de arrumar :p) 
npx prisma generate (Gera as execuções que o Prisma ira executar para criar as tabelas do banco de dados ) 
npx prisma migrate dev --name "nome aqui sem aspas"  (Executa os commandos do prisma no banco de dados que você utiliza no .env)
npm run dev (Executa o back-end e por fim reflete no seu .env.local para renderizar os dados no front-end :) )

```

#E SE LEMBRE DE CRIAR UM ARQUIVO .ENV COM O DATABASE_URL e UM JWT_KEY 

```
Algo parecido com isto 
DATABASE_URL="SEUDB(MYSQL\POSTGRESS... ETC):LocalDoSeuDatabase"
JWT_KEY="SENHAAQUI"
```
