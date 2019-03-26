import { element } from "@angular/core/src/render3";

export class Utils {

    portafolio = [];
    portafolios = [
        {id:1, value:'Libre inversion A'},
        {id:1, value:'Credio Consumo A'},
        {id:1, value:'Bono sodexo A'},
        {id:1, value:'Libre A'},
        {id:2, value:'Libre inversion B'},
        {id:2, value:'Credio Consumo B'},
        {id:2, value:'Bono sodexo B'},
        {id:2, value:'Libre B'},
        {id:3, value:'Libre inversion C'},
        {id:3, value:'Credio Consumo C'},
        {id:3, value:'Bono sodexo C'},
        {id:3, value:'Libre C'},
        {id:4, value:'Libre inversion D'},
        {id:4, value:'Credio Consumo D'},
        {id:4, value:'Bono sodexo D'},
        {id:4, value:'Libre D'},
        {id:5, value:'Libre inversion E'},
        {id:5, value:'Credio Consumo E'},
        {id:5, value:'Bono sodexo E'},
        {id:5, value:'Libre E'}
    ]

    constructor(
    ) {
    }
    public getBrands(){
        return [  
            { name: 'aloha', image: 'assets/images/brands/aloha.png' },
            { name: 'dream', image: 'assets/images/brands/dream.png' },  
            { name: 'congrats', image: 'assets/images/brands/congrats.png' },
            { name: 'best', image: 'assets/images/brands/best.png' },
            { name: 'original', image: 'assets/images/brands/original.png' },
            { name: 'retro', image: 'assets/images/brands/retro.png' },
            { name: 'king', image: 'assets/images/brands/king.png' },
            { name: 'love', image: 'assets/images/brands/love.png' },
            { name: 'the', image: 'assets/images/brands/the.png' },
            { name: 'easter', image: 'assets/images/brands/easter.png' },
            { name: 'with', image: 'assets/images/brands/with.png' },
            { name: 'special', image: 'assets/images/brands/special.png' },
            { name: 'bravo', image: 'assets/images/brands/bravo.png' }
        ];
    }


    public getGrupoAval(){
        return [
            { value: 1, name: 'Banco de Bogota' },
            { value: 2, name: 'Banco de Occidente' },
            { value: 3, name: 'Banco Popular' },
            { value: 4, name: 'Banco AV Villas' },
            { value: 5, name: 'BAC' }
        ]
    }

    public getPortafolioByBanco(banco: number)
    {
        this.portafolio=[]
        this.portafolios.forEach(element => {
            if(element.id === banco) {
                this.portafolio.push(element);
            }
        }
        );
        return this.portafolio;
    }
  }
  