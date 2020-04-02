import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";

import "./styles.css";

export default class Main extends Component{
    state = {
        products: [],
        productInfo: {},
        page: 1,
    };

    //Componente utilizado para fazer uma ação logo que o componente aparecer na tela
    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1 ) => {
        //acessando a API
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data; 

        this.setState({products: docs, productInfo, page});

        //Comando para aparecer dados no console do navegador:
        //console.log(response.data.docs);

    };

    prevPage = () => {
        const { page, productInfo } = this.state;

        if(page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    }
        
    nextPage = () => {
        const { page, productInfo } = this.state;

        //Verificar se já é a ultima página
        if(page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    render(){
        const { products, page, productInfo } = this.state;

        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>

                    //<h2 key={products._id}>{products.title}</h2>
                ))}

                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled ={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>            
        )
        //Exemplo para contar a quantidade de produtos
        //<h1>Contagem de produtos: {this.state.products.length}</h1>
    }
}