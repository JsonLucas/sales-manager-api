import { App } from "./utils/app";
import { port } from "./utils/env";

new App().application.listen(port, () => console.log(`server running at port ${port}`));