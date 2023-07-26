import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

function App() {
  return (
    <div>
      <Header />
      <Note 
      title="Test 1"
      content="Testing 1"/>
      <Note 
      title="Test 2"
      content="Testing 2"/>
      <Footer />
    </div>
  );
}

export default App;
