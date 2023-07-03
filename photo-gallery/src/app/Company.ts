export class Company
{
    name: string;
    description: string;
    price: string;
    imagePath: string;

    constructor(name: string, description: string, price: string, imagePath: string)
    {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imagePath = imagePath;
    }
}