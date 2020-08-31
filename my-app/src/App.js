 import React from "react";
 import './App.css';
import Pagination from './components/Pagination'
const exampleItems = [
  {  idName: "126", teamName: "Alpha Team", domain:"eCommerce" },
  { idName: "124", teamName: "Enforcers", domain: "Finance" },
  {  idName: "125", teamName: "Bachelors", domain: "Global" },
  { idName: "129", teamName: "Bad Boys", domain: "Finance" },
  {  idName: "127", teamName: "Berets", domain:"eCommerce" },
  {  idName: "123", teamName: "Defender", domain: "eCommerce"  },
  { idName: "125", teamName: "Champions", domain: "Global" },
  { idName: "130 ", teamName: "Chargers", domain:"Global" },
  { idName: "146", teamName: "Deathwish", domain: "Global" },
  {  idName: "155", teamName: "Bad Boys", domain: "eCommerce"  },
  {  idName: "126", teamName: "Alpha Team", domain:"eCommerce" },
  { idName: "124", teamName: "Enforcers", domain: "Finance" },
  {  idName: "125", teamName: "Bachelors", domain: "Global" },
  { idName: "129", teamName: "Bad Boys", domain: "Finance" },
  {  idName: "127", teamName: "Berets", domain:"eCommerce" },
  {  idName: "123", teamName: "Defender", domain: "eCommerce"  },
  { idName: "125", teamName: "Champions", domain: "Global" },
  { idName: "130 ", teamName: "Chargers", domain:"Global" },
  { idName: "146", teamName: "Deathwish", domain: "Global" },
  {  idName: "168", teamName: "Bad Boys", domain: "eCommerce"  },
  {  idName: "139", teamName: "Apple", domain: "eCommerce"  },
  { idName: "124", teamName: "Champions", domain: "Global" },
  { idName: "165 ", teamName: "Chargers", domain:"Global" },
  { idName: "146", teamName: "Deathwish", domain: "Global" },
  {  idName: "155", teamName: "Bad Boys", domain: "eCommerce"  },
  {  idName: "186", teamName: "Alpha Team", domain:"eCommerce" },
  { idName: "120", teamName: "Enforcers", domain: "Finance" },
  {  idName: "128", teamName: "Bachelors", domain: "Global" },
  { idName: "122", teamName: "Bad Boys", domain: "Finance" },
]



class App extends React.Component {
  constructor() {
      super();
    this.state = {
          exampleItems: exampleItems,
          pageOfItems: [],
          dropdown: false,
      };

      this.onChangePage = this.onChangePage.bind(this);
      this.onSortUp = this.onSortUp.bind(this)
      this.onSortDown = this.onSortDown.bind(this)
  
  }

  onChangePage(pageOfItems) {
      // update state with new page of items
      this.setState({ pageOfItems: pageOfItems });
  }
  onSortUp(event, sortKey){
    const pageOfItems = this.state.pageOfItems;
    pageOfItems.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
    this.setState({pageOfItems})
    this.setState({dropdown:false})
 
  }

  onSortDown(event, sortKey){
    const pageOfItems = this.state.pageOfItems;
    pageOfItems.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
    this.setState({pageOfItems})
    this.setState({dropdown:true})
  }

  render() {
      return (
          <div>
          <table>
        <thead>
          <tr>
            <th >AccountName
             {this.state.dropdown === true && <span onClick={e => this.onSortUp(e, 'idName')}>∧</span>} 
              {this.state.dropdown === false && <span onClick={e => this.onSortDown(e, 'idName')}>∨</span> }
             
              </th>
            <th >teamName
            {this.state.dropdown === true && <span onClick={e => this.onSortUp(e, 'teamName')}>∧</span>} 
              {this.state.dropdown === false && <span onClick={e => this.onSortDown(e, 'teamName')}>∨</span> }
       
              </th>
            <th >domain
            {this.state.dropdown === true && <span onClick={e => this.onSortUp(e, 'domain')}>∧</span>} 
              {this.state.dropdown === false && <span onClick={e => this.onSortDown(e, 'domain')}>∨</span> }
              </th>
          </tr>
        </thead>
        <tbody>
        {this.state.pageOfItems.map(item =>
                          <tr key={item.id} >
                                         <td >{item.idName}</td>
                                          <td >{item.teamName}</td>
                                           <td >{item.domain}</td>
                          
                                        </tr>

                      )}
        </tbody>
      </table>
  

                  
                      <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
                
             
          </div>
      );
  }
}

export default App;