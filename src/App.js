import React, { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';
import { GRADING } from './Variables';
import TypeProdutcs from './components/TypeProducts';
import SearchType from './components/SearchType';
import GradeCalculator from './components/GradeCalculator';
import Barcode from './components/Barcode';

const calculateGrade = (grades) => {
  let functional = 'A';
  let esthetics = '2';
  let missing = 'G';

  grades.forEach(grade => {
    if (grade === 'S6') {
      functional = 'S6';
      return;
    }
    if (grade === 'F') {
      functional = 'F';
    } else if (grade === 'A' && functional !== 'F') {
      functional = 'A';
    }
    if (['2', '3', '4'].includes(grade) && parseInt(grade) > parseInt(esthetics)) {
      esthetics = grade;
    }
    if (grade === 'L') {
      missing = 'L';
    } else if (grade === 'G' && missing !== 'L') {
      missing = 'G';
    }
  });

  if (functional === 'S6') {
    return 'S6';
  }
  return `${functional}${esthetics}${missing}`;
};

const App = () => {
  const [currentType, setCurrentType] = useState("LT");
  const [currentCommentsInList, setCurrentCommentsInList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [addedElements, setAddedElements] = useState([]);
  const [addedElementsGrades, setAddedElementsGrades] = useState([]);
  const searchInputRef = useRef(null);

  const selectCurrentCommentsType = useCallback((type) => {
    const filteredComments = GRADING.filter(comment => comment[type]);
    setCurrentCommentsInList(filteredComments);
  }, []);

  const selectType = useCallback((type) => {
    setCurrentType(type);
    selectCurrentCommentsType(type);
    setAddedElements([]);
    setAddedElementsGrades([]);
  }, [selectCurrentCommentsType]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    if (query) {
      const results = currentCommentsInList.filter(comment =>
        comment.English.toLowerCase().startsWith(query.toLowerCase()) ||
        comment.French.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [currentCommentsInList]);

  const handleAddElement = useCallback((element) => {
    setAddedElements((prevElements) => [...prevElements, element]);
    setSearchQuery("");
    setFilteredResults([]);
    setAddedElementsGrades((prevElements) => [...prevElements, element.GRADE]);
  }, []);

  const handleRemoveElement = useCallback((index) => {
    setAddedElements((prevElements) => prevElements.filter((_, i) => i !== index));
    setAddedElementsGrades((prevGrades) => prevGrades.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
    if (currentType) {
      selectCurrentCommentsType(currentType);
    }
  }, [currentType, selectCurrentCommentsType]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchQuery]);

  const handleBarcodeScan = useCallback((event) => {
    if (event.key === 'Enter' && filteredResults.length > 0) {
      handleAddElement(filteredResults[0]);
    }
  }, [filteredResults, handleAddElement]);

  const openTableWindow = useCallback(() => {
    const tableWindow = window.open("", "", "width=800,height=600");
    const tableContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Table</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <h1>Liste des commentaires disponibles pour le type ${currentType}</h1>
          <table>
            <thead>
              <tr>
                <th>Anglais</th>
                <th>Français</th>
                <th>Commentaires</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              ${currentCommentsInList.map(item => `
                <tr>
                  <td>${item.English}</td>
                  <td>${item.French}</td>
                    <td>${item.Comment}</td>
                  <td>${item.GRADE.join(", ")}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    tableWindow.document.write(tableContent);
    tableWindow.document.close();
  }, [currentCommentsInList, currentType]);

  const finalGrade = calculateGrade(addedElementsGrades.flat());

  return (
    <div className="App">
      <div className="type-products-container">
        <TypeProdutcs selectType={selectType} currentType={currentType} openTableWindow={openTableWindow} />
      </div>

      <SearchType
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        filteredResults={filteredResults}
        handleAddElement={handleAddElement}
        handleBarcodeScan={handleBarcodeScan}
        searchInputRef={searchInputRef} // Pass the ref to SearchType component
      />
      <ul>
        {addedElements.map((comment, index) => (
          <li key={index}>
            <Barcode value={comment.French} />
            {comment.French} - {comment.GRADE.join(", ")}
            <button onClick={() => handleRemoveElement(index)}>x</button>
          </li>
        ))}
      </ul>
      <div className="grade-summary">
        <h2>GRADE</h2>
        <div>
          <GradeCalculator finalGrade={finalGrade} />
        </div>
        <Barcode value={finalGrade} />
      </div>
    </div>
  );
}

export default App;
