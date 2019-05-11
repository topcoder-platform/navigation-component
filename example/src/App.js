import React from 'react';
import { Navigation } from "community-nav-prototype";
import './App.scss';


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { theme : 'light' };
  }

  render() {
    const navMenus = [
      {
        value: 'BUSINESS',
        subMenu: [
          {
            value: "Solutions",
            subMenu: [
              { value: "All Solutions" },
              { value: "Apps" },
              { value: "Websites" },
              { value: "Product Design" },
              { value: "Development Tasks" },
              { value: "Analytics & Data Science" },
              { value: "Testing & QA" },
              { value: "How It Works" },
            ]
          },
          {
            value: "Enterprise Programs",
            subMenu: [
              { value: "All Solutions" },
              { value: "Apps" },
              { value: "Websites" },
              { value: "Product Design" },
              { value: "Development Tasks" },
              { value: "Analytics & Data Science" },
              { value: "Testing & QA" },
              { value: "How It Works" },
            ]
          },
          {
            value: "Customer Success",
            subMenu: [
              { value: "All Solutions" },
              { value: "Apps" },
              { value: "Websites" },
              { value: "Product Design" },
              { value: "Development Tasks" },
              { value: "Analytics & Data Science" },
              { value: "Testing & QA" },
              { value: "How It Works" },
            ]
          },
          {
            value: "Company",
            subMenu: [
              { value: "All Solutions" },
              { value: "Apps" },
              { value: "Websites" },
              { value: "Product Design" },
              { value: "Development Tasks" },
              { value: "Analytics & Data Science" },
              { value: "Testing & QA" },
              { value: "How It Works" },
            ]
          },
          {
            value: "Resources",
            subMenu: [
              { value: "All Solutions" },
              { value: "Apps" },
              { value: "Websites" },
              { value: "Product Design" },
              { value: "Development Tasks" },
              { value: "Analytics & Data Science" },
              { value: "Testing & QA" },
              { value: "How It Works" },
            ]
          },
          {
            value: "Blog",
            subMenu: [
              { value: "All Solutions" },
              { value: "Apps" },
              { value: "Websites" },
              { value: "Product Design" },
              { value: "Development Tasks" },
              { value: "Analytics & Data Science" },
              { value: "Testing & QA" },
              { value: "How It Works" },
            ]
          },
        ]
      },
      {
        value: 'WORK',
        subMenu: [
          {
            value: "Design",
            subMenu: [
              { value: "Overview" },
              { value: "Work List" },
              { value: "Stats" },
              { value: "Problem archive" },
              { value: "Learn" },
              { value: "Topcoder Open" },
            ]
          },
          {
            value: "Development",
            subMenu: [
              { value: "Overview" },
              { value: "Work List" },
              { value: "Stats" },
              { value: "Problem archive" },
              { value: "Learn" },
              { value: "Topcoder Open" },
            ]
          },
          {
            value: "Data Science",
            subMenu: [
              { value: "Overview" },
              { value: "Work List" },
              { value: "Stats" },
              { value: "Problem archive" },
              { value: "Learn" },
              { value: "Topcoder Open" },
            ]
          },
          {
            value: "QA",
            subMenu: [
              { value: "Overview" },
              { value: "Work List" },
              { value: "Stats" },
              { value: "Problem archive" },
              { value: "Learn" },
              { value: "Topcoder Open" },
            ]
          },
          {
            value: "Topcoder Open",
            subMenu: [
              { value: "Overview" },
              { value: "Work List" },
              { value: "Stats" },
              { value: "Problem archive" },
              { value: "Learn" },
              { value: "Topcoder Open" },
            ]
          }
        ]
      },
      {
        value: 'MORE',
        subMenu: [
          {
            value: "About Topcoder",
            subMenu: [
              { value: "Overview" },
              { value: "Work List" },
              { value: "Stats" },
              { value: "Problem archive" },
              { value: "Learn" },
              { value: "Topcoder Open" },
            ]
          },
          {
            value: "Contact Us",
            subMenu: [
              { value: "Overview" },
              { value: "Work List" },
              { value: "Stats" },
              { value: "Problem archive" },
              { value: "Learn" },
              { value: "Topcoder Open" },
            ]
          },
          {
            value: "Carreers",
            subMenu: [
              { value: "Overview" },
              { value: "Work List" },
              { value: "Stats" },
              { value: "Problem archive" },
              { value: "Learn" },
              { value: "Topcoder Open" },
            ]
          },
          {
            value: "Terms & Conditions",
            subMenu: [
              { value: "Overview" },
              { value: "Work List" },
              { value: "Stats" },
              { value: "Problem archive" },
              { value: "Learn" },
              { value: "Topcoder Open" },
            ]
          },
          {
            value: "Social",
            subMenu: [
              { value: "Overview" },
              { value: "Work List" },
              { value: "Stats" },
              { value: "Problem archive" },
              { value: "Learn" },
              { value: "Topcoder Open" },
            ]
          },
          {
            value: "Press Kits",
            subMenu: [
              { value: "Overview" },
              { value: "Work List" },
              { value: "Stats" },
              { value: "Problem archive" },
              { value: "Learn" },
              { value: "Topcoder Open" },
            ]
          },
          {
            value: "Partner Programs",
            subMenu: [
              { value: "Overview" },
              { value: "Work List" },
              { value: "Stats" },
              { value: "Problem archive" },
              { value: "Learn" },
              { value: "Topcoder Open" },
            ]
          },
        ]
      }
    ];

    return (
      <div className="App">
        <Navigation navMenus={navMenus} theme={this.state.theme} />
        <div className="Bottom">
          <button className={ this.state.theme === 'dark' ? 'selected' : ''} onClick={() => { this.setState({theme: 'dark'}); }}><h1>Dark Theme</h1></button>
          <button className={ this.state.theme === 'light' ? 'selected' : ''}  onClick={() => { this.setState({theme: 'light'}); }}><h1>Light Theme</h1></button>
        </div>
        
      </div>
    );
  }
}

export default App;
