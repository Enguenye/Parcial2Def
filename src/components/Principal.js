import React, { Component } from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural, FormattedMessage } from 'react-intl';

import * as d3 from 'd3';

let cont = 0;

class Principal extends Component {


    componentDidMount() {
        if (!navigator.onLine) {
            if (localStorage.getItem('datos') === null)
                this.setState({ datos: "loading..." })
            else
                this.setState({ datos: localStorage.getItem('datos') });
        }

        fetch("https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json")
        .then(res => {
            return res.json();
        }).then(res => {
            fetch("https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json")
        .then(res2 => {
            return res2.json();
        }).then(res2 => {
            if(navigator.language==="es"){
                this.setState({ datos: res });
                localStorage.setItem('datos', res.value);
                this.drawChart(res);
            }
            else{
                this.setState({ datos: res2 });
                localStorage.setItem('datos', res2.value);
                this.drawChart(res2);
            }
        });
        });
    }


    constructor(props) {
        super(props);
        this.componentDidMount.bind(this);

    }

    
    state={
        datos:[],
        imagen:"",
        titulo:"",
        descripcion:"",
         cast:""
    }
      
    

    render() {
        return (
            <div>
                 <table className="table">
          <thead className="thead-dark">
            <tr>
            <th scope="col">#</th>
              <th scope="col">
              <FormattedMessage id="Name"/>
              </th>
              <th scope="col">
              <FormattedMessage id="DirectedBy"/>
              </th>
              <th scope="col">
              <FormattedMessage id="Country"/>
              </th>
              <th scope="col">
              <FormattedMessage id="Budget"/>
              </th>
              <th scope="col">
              <FormattedMessage id="Release"/>
              </th>
              <th scope="col">
              <FormattedMessage id="Views"/>
              </th>
              <th scope="col">
              <FormattedMessage id="Detalle"/>
              </th>
            </tr>
          </thead>
          <tbody>
             {this.state.datos.map((e)=><tr>
                 <td scope="row">{e.id}</td>
             <td scope="row">{e.name}</td>
             <td scope="row">{e.directedBy}</td>
             <td scope="row">{e.country}</td>
             <td>{e.budget}<FormattedPlural value={e.budget} one= {<FormattedMessage id="Million"/>} other={<FormattedMessage id="Millions"/>}/></td>
             <FormattedDate
						value={new Date(e.releaseDate)}
						year='numeric'
						month='long'
						day='numeric'
						weekday='long'
					/>
             <td scope="row"><FormattedNumber value= {e.views}></FormattedNumber></td>
             <td scope="row"><button id="1" onClick={()=>this.cambiarDetail(e.name,e.poster, e.description, e.cast)} type="button" class="btn btn-primary">Detalle</button>></td>
             </tr>)}
          </tbody>
        </table>
        <div class="card">
            <img src={this.state.imagen} class="card-img-top" alt="..."/>
            <div className="card-body">
             <h5 className="card-title">{this.state.titulo}</h5>
             <p className="card-text">{this.state.descripcion}</p>
             <p className="card-text">{this.state.cast}</p>
            </div>
          </div>
          <div ref="canvas"></div>
            </div>
            

        );
    }

    cambiarDetail(nombre,poster,descripcion2,cast2){
        this.setState({ titulo: nombre });
        this.setState({ descripcion: descripcion2 });
        this.setState({ imagen: poster });
        this.setState({ cast: cast2 });
    }

    drawChart(data){
        
        console.log(data);
        const width = 700;
        const height = 500;
        const margin = { top:10, left:100, bottom: 40, right: 10};
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top -margin.bottom;
        
        const svg = d3.select(this.refs.canvas).append('svg');
        svg.attr("width", width);
        svg.attr("height", height);
        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
        const y = d3.scaleLinear() 
            .domain([0, 10000000])
            .range([iheight, 0]);
        const x = d3.scaleBand()
        .domain(data.map(d => d.id) ) 
        .range([0, iwidth])
        .padding(0.1); 
        
        const bars = g.selectAll("rect").data(data);
        
        bars.enter().append("rect")
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("x", d => x(d.id))
        .attr("y", d => y(d.views))
        .attr("height", d => iheight - y(d.views))
        .attr("width", x.bandwidth())  
        
        g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);  
        
        g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));
    }

    


}

export default Principal;