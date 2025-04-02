//Using state in class Components in React

import React,{Components} from 'react';

class Counter extends Component{
    constructor(){
        super();
        this.state={
            count:0
        };

        increment =()=>{
            this.setState({count:this.state/count+1});
        };

        render(){
            

            <div>
                <p>count: {this.state.count}</p>
                <button onClick={this.increment}>Increment</button>
            </div>
        }
    }
}