import * as express from 'express';

const app: express.Express = express();
app.listen(8080);



app.post("/todo")
app.get("/todo")
app.delete("/todo/:id")


