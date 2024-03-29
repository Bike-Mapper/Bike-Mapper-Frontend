// Classe que representa uma compania
export class Company
{
    // nome da compania
    name: string;
    // descrição da compania
    description: string;
    // preço do produto vendido pela compania
    price: string;
    // path para a imagem que representa o produto que está sendo vendido
    imagePath: string;
    // URL do cupom
    id: string;

    constructor(name: string, description: string, price: string, imagePath: string, id: string)
    {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imagePath = imagePath;
        this.id = id;
    }
}