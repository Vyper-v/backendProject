import ContainerFirebase from "../../ContainerFirebase";
import { credential } from "../../../config";
export default class CartContainerFirebase extends ContainerFirebase {
  constructor() {
    super(credential, "carts");
  }
}
