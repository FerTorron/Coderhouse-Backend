export const registerUserErrorInfo = (user) => {
    return `
        Alguno de los campos para crear el usuario no es valido
        Lista de campos requeridos:
        first_name: debe ser un campo de tipo String, pero se recibio ${user.first_name},
        last_name: debe ser un campo de tipo String, pero se recibio ${user.last_name},
        age:debe ser un campo de tipo String, pero se recibio ${user.age},
        email:debe ser un campo de tipo String, pero se recibio ${user.email},
        password:debe ser un campo de tipo String, pero se recibio ${user.password},
    `
}

export const loginUserErrorInfo = (user) => {
    return `
        Alguno de los campos para iniciar sesion no es valido
        Lista de campos requeridos:
        first_name: debe ser un campo de tipo String, pero se recibio ${user.username},
        password:debe ser un campo de tipo String, pero se recibio ${user.password},
    `
}

export const newProductErrorInfo = (product) => {
    return `
        Alguno de los campos para crear el producto no es valido
        Lista de campos requeridos:
        title: debe ser un campo de tipo String, pero se recibio ${product.title},
        description:debe ser un campo de tipo String, pero se recibio ${product.description},
        price:debe ser un campo de tipo String, pero se recibio ${product.price},
        category:debe ser un campo de tipo String, pero se recibio ${product.category},
        code:debe ser un campo de tipo String, pero se recibio ${product.code},
        stock:debe ser un campo de tipo String, pero se recibio ${product.stock},
    `
}