import ContainerFirebase from "../../ContainerFirebase";
import { credential } from "../../../config";
export default class ProductontainerFirebase extends ContainerFirebase {
  constructor() {
    super(credential, "products");
  }
}
