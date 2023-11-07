export function duplicatedProductId(pedido_produtos) {
  const arrayWithProductId = pedido_produtos.reduce((acc, cur) => {
    return (acc = [...acc, cur.produto_id]);
  }, []);
  const duplicatedIdExists = arrayWithProductId.filter(
    (item) => item === arrayWithProductId[0]
  );

  if (duplicatedIdExists.length > 1) {
    return true;
  } else {
    return false;
  }
}
