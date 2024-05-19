import axios from "axios";

const checkProductAvailability = async (product_id: number, quantity: number) => {
  const res = await axios
    .get("http://localhost:5001/products/check-availability", {
      params: { product_id, quantity },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

  return res
}

export default { checkProductAvailability }