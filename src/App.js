import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './App.css';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

const App = () => {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState('');
const [showModal, setShowModal] = useState(false);
  const handleSegmentNameChange = (event) => {
    setSegmentName(event.target.value);
  };

  const handleSchemaChange = (event) => {
    setSelectedSchema(event.target.value);
  };

  const handleAddSchema = () => {
    if (selectedSchema) {
      setSelectedSchemas((prevSchemas) => [...prevSchemas, selectedSchema]);
      setSelectedSchema('');
    }
  };

  const handlers = (e) => {
    e.preventDefault();  
  }


  const handleSaveSegment = () => {
    const formattedSchema = selectedSchemas.map((schema) => {
      return { [schema]: schema };
    });


    const data = {
      segment_name: segmentName,
      schema: formattedSchema,
    };

   let axiosConfig = {
    'Content-Type':'application/json',
    'Access-control-allow-origin':'*',
    'sec-fetch-mode':'cors'
   }
    axios
      .post('https://webhook.site/983cffd9-a37c-48bb-b021-645c98c65178', data,axiosConfig)
      .then((response) => {
        console.log('Segment data sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending segment data:', error);
      });

    setShowModal(false);
    setSegmentName('');
    setSelectedSchemas([]);
  };

  return (
    <div className="App">
      <h1>Segment App</h1>
      <button onClick={() => setShowModal(true)}>Save segment</button>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Save Segment Modal"
      >

      
      <div className="modal">
        <h2>Save Segment</h2>
        <h3>Enter the name of the segment</h3>
        <input
          type="text" className='inputboxes'
          placeholder="Enter segment names"
          value={segmentName}
          onChange={handleSegmentNameChange}
        /><br />

        <p>To save your segment, you need to add the schemas to build the query</p>
        <select value={selectedSchema} onChange={handleSchemaChange}>
          <option value="" disabled>
            Add schema to segment
          </option>
          {schemaOptions
            .filter((option) => !selectedSchemas.includes(option.value))
            .map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
        <button onClick={handleAddSchema} className='btnschema'>+ Add new schema</button>

        <div className="blue-box">
          {selectedSchemas.map((schema) => (
            <div key={schema}>{schema}</div>
          ))}
        </div>  <br />

        <button onClick={handleSaveSegment} className='btngreen'>Save the segment</button>
        <button onClick={handlers} className='cancelbtn'>Cancel</button>


      </div>
      </Modal>
</div>

  );
};

export default App;
