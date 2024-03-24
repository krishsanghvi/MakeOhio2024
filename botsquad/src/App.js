import React, { useState, useEffect } from 'react';
import './App.css';
import RahulImage from './rahul.png'; // Corrected the path to match the case sensitivity
import IconImage from './Icon.png'; // Assuming the icon image is in the root of the project folder
import StatImage from './stat.png';
import ClockImage from './clock.png';
import PersonImage from './person.png';
import TeachableMachineComponent  from './components/TeachableMachineComponent';
import AudioLinesImage from './audio-lines.png'; // Assuming the image is in the root of the project folder
import UpImage from './up.png'; // Importing the up.png image
import DownImage from './down.png'; // Importing the up.png image
import CheckImage from './check.png'; // Assuming the check icon is named check.png and located in the root of the project folder
import MyChatbot from './components/chatbot'; // Adjust the import path as necessary
import AudioVisualizer from './components/audiolevel';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [isNewUserFormVisible, setIsNewUserFormVisible] = useState(false);

  const toggleChatbot = () => {
    console.log("Clicked", isChatbotVisible);
    setIsChatbotVisible(!isChatbotVisible);
  };

  useEffect(() => {
    if (isChatbotVisible) {
      // Render MyChatbot component when isChatbotVisible is true
      <MyChatbot isVisible={isChatbotVisible} />;
    }
  }, [isChatbotVisible]); // Adding isChatbotVisible as a dependency so the effect runs when its state changes

  const toggleNewUserForm = () => {
    setIsNewUserFormVisible(!isNewUserFormVisible);
  };

  const handleNewUserSubmit = (event) => {
    event.preventDefault(); // Prevent the form from causing a page reload
    const formData = new FormData(event.target);
    const newUser = {
      name: formData.get('name'), // Assuming the input's name is 'name'
      phone: formData.get('phone'), // Assuming the input's name is 'phone'
    };
    console.log(newUser); // Here you can handle the newUser object (e.g., state update, API call)

    // Close the form after submit
    setIsNewUserFormVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://api.weatherapi.com/v1/current.json?key=3df91e1aeedf44ff946115921241802&q=Columbus Ohio&aqi=no';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWeatherData(data); // Set the weather data in state
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="App" style={{ position: 'relative' }}>
      <div className="flex">
        {/* Dashboard Sidebar */}
        <div className="bg-black w-64 h-screen flex flex-col items-start pt-6 pl-6 justify-between">
          <div>
            {/* Bot Squad title adjusted to align with the bottom axis of the Dashboard title */}
            <h1 className="text-white text-2xl" style={{ position: 'absolute', top: '32px', left: '6px'}}>notifi</h1>
            {/* Existing Add New User Button */}
            <button onClick={toggleNewUserForm} style={{
              marginTop: '75px',
              width: '184px',
              height: '48px',
              borderRadius: '24px',
              backgroundColor: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '5px',
            }}>
              <div style={{
                width: '37px',
                height: '37px',
                borderRadius: '50%',
                backgroundColor: '#E65F2B',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '29px',
                lineHeight: '35px',
                textAlign: 'center',
                position: 'relative',
              }}>
                +
              </div>
              <div style={{
                marginLeft: '10px',
                fontSize: '14px',
              }}>
                Add New User
              </div>
            </button>
            {isNewUserFormVisible && (
              <form onSubmit={handleNewUserSubmit} style={{ marginTop: '20px' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  style={{ display: 'block', marginBottom: '10px', width: '100%' }}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  style={{ display: 'block', marginBottom: '10px', width: '100%' }}
                />
                <button type="submit" style={{
                  display: 'block',
                  width: '100%',
                  backgroundColor: '#E65F2B',
                  color: 'white',
                  padding: '10px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}>
                  Submit
                </button>
              </form>
            )}
          </div>
         {/* New Circle Button at the bottom left with Icon */}
         <button onClick={toggleChatbot} style={{
            marginBottom: '20px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#E65F2B',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <img src={IconImage} alt="Icon" style={{
              width: '24px',
              height: '24px',
            }} />
          </button>
        </div>
        
        {/* Horizontal Line */}
        <div style={{
          position: 'absolute',
          top: '95px',
          left: '256px',
          right: 0,
          height: '1px',
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        }}></div>

        {/* Main Content Area */}
        <div className="flex-grow" style={{ backgroundColor: '#EBDFD7', paddingLeft: '266px', paddingTop: '20px' }}>
          {/* Dashboard Title */}
          <h1 style={{
            position: 'absolute',
            left: '266px',
            top: '20px',
            color: '#000606',
            fontSize: '32px',
            fontWeight: '500',
          }}>
            Dashboard
          </h1>
          {/* Search Box */}
          <input style={{
            position: 'absolute',
            right: '230px',
            top: '20px',
            width: 'calc(100% - 296px)',
            maxWidth: '394px',
            height: '48px',
            borderRadius: '55px',
            border: '1px solid #ccc',
            paddingLeft: '15px',
          }} placeholder="Search..."/>
          {/* New Button with Rahul.png as a circle */}
          <button style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            width: '195px',
            height: '48px',
            borderRadius: '24px',
            backgroundColor: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: '10px',
          }}>
            <img src={RahulImage} alt="Rahul" style={{
              width: '38px',
              height: '38px',
              marginRight: '1px',
              objectFit: 'cover',
              borderRadius: '50%',
            }}/>
            <div style={{
              marginLeft: '10px',
              position: 'relative',
              top: '1px',
            }}>
              <div style={{ fontSize: '14px' }}>
                Rahul Nalam
              </div>
              <div style={{
                color: '#292D32',
                fontSize: '12px',
                marginLeft: '-10px'
              }}>
                Homeowner
              </div>
            </div>
          </button>
          {/* Overview Text */}
          <div style={{
            position: 'absolute',
            left: '266px',
            top: '110px', // 95px (line's top) + 15px
            fontSize: '25px',
            fontWeight: '400',
            color: '#000606',
          }}>
            Overview
          </div>
          {/* Overview Boxes Section */}
          <div style={{
            position: 'absolute',
            left: '266px',
            top: '165px', // Moved up by 5px from '175px'
            display: 'flex',
            flexWrap: 'wrap', // Added to handle overflow by wrapping boxes to the next line if needed
            justifyContent: 'flex-start', // Changed from 'space-between' to 'flex-start'
            width: 'calc(100% - 266px)', // Adjusted to match the left offset
          }}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} style={{
                width: '341px', // You can adjust this width as needed
                height: '215px',
                backgroundColor: 'rgba(255, 255, 255, 0.34)',
                borderRadius: '14px',
                boxShadow: `0 0 0 1px #EBDFD7`,
                marginRight: '20px', // Consistent spacing for all boxes
                marginBottom: '20px', // Added to handle vertical spacing when boxes wrap to the next line
                position: 'relative', // Added to position the circle absolutely within the box
              }}>
                {/* Circle at the top left of each box with specific colors for each */}
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: index === 0 ? '#D398E7' : 
                                   index === 1 ? '#E89271' : 
                                   index === 2 ? '#70A1E5' : 
                                   '#F0C274', // Last circle with #F0C274 color
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  {index === 0 && <img src={StatImage} alt="Stat" style={{ width: '24px', height: '24px' }}/>}
                  {index === 1 && <img src={AudioLinesImage} alt="Audio" style={{ width: '24px', height: '24px' }}/>}
                  {index === 2 && <img src={ClockImage} alt="Clock" style={{ width: '24px', height: '24px' }}/>}
                  {index === 3 && <img src={PersonImage} alt="Person" style={{ width: '24px', height: '24px' }}/>}
                </div>
                {/* Common content for all boxes */}
                <div style={{
                  color: '#797979',
                  fontSize: '14px',
                  position: 'absolute',
                  top: '76px',
                  left: '10px',
                }}>
                  {index === 1 ? "Audio Measurements" : 
                   index === 2 ? "Guest Occurrences" : 
                   index === 3 ? "Most Recent Guest" : "Total Occurrences"} {/* Updated text for the last box */}
                </div>
                <div style={{
                  color: '#060606', // Font color set as requested
                  fontSize: '28px', // Font size set as requested
                  fontWeight: 'bold', // Made the font thicker
                  position: 'absolute',
                  top: '105px', // Pushed down 15px more from the previous position
                  left: '10px',
                }}>
                  {index === 3 ? "Jay Oswal" : (index === 1 ? "120 DB" : (index === 2 ? "62 Guests" : "453 Occurrences"))}
                </div>
                <img src={UpImage} alt="Up" style={{
                  width: '17px', // Width set as requested
                  height: '17px', // Height set as requested
                  position: 'absolute',
                  top: '175px', // Positioned 25px down from the "453" text
                  left: '10px',
                }}/>
                <div style={{
                  color: '#060606', // Font color set as requested
                  fontSize: '10px', // Font size set as requested
                  position: 'absolute',
                  top: '175px', // Aligned with the image
                  left: '32px', // Positioned right next to the image
                }}>
                  12% increase from last month
                </div>
              </div>
            ))}
          </div>
          <div style={{
            position: 'absolute',
            left: '266px',
            top: '395px', // Adjusted for spacing
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            width: 'calc(100% - 266px)',
          }}>
            <div style={{
              width: '872px', // Adjusted to span two boxes and half of the third
              height: '400px', // Height increased by 30px
              backgroundColor: 'rgba(255, 255, 255, 0.34)',
              borderRadius: '14px',
              boxShadow: `0 0 0 1px #EBDFD7`,
              marginBottom: '15px',
              position: 'relative',
              display: 'flex', // Ensures that the child components can fill the space
            }}>
              
              <div style={{ width: '100%', height: '100%' }}>
                <TeachableMachineComponent />
              </div>
              {/* Content inside the new box can be added here */}
            </div>
            {/* New smaller box below the large box */}
            <div style={{
              width: '872px', // Width as specified
              height: '150px', // Height as specified
              backgroundColor: 'rgba(255, 255, 255, 0.34)', // Matching the filling of the other boxes
              borderRadius: '14px', // Matching the corner radius of the other boxes
              boxShadow: `0 0 0 1px #EBDFD7`, // Matching the shadow of the other boxes
              marginTop: '2px', // Space above this box, adjust as needed for your layout
              position: 'relative', // Use relative for positioning within the layout
            }}>
              <AudioVisualizer />
              {/* Content inside the new smaller box can be added here */}
            </div>
          </div>
          {/* Adjusted New Box with specified requirements */}
          <div style={{
            position: 'absolute',
            left: '1158px', // Starts 20px after the big box
            top: '395px', // Positioned at the same top as specified before
            width: '532px', // Corrected width to ensure it aligns with the end of the fourth small box
            height: '400px', // Specified height
            backgroundColor: 'rgba(255, 255, 255, 0.34)', // Matching the beige color
            borderRadius: '14px', // Matching the corner radius
            boxShadow: `0 0 0 1px #EBDFD7`, // Matching the shadow
            marginBottom: '15px', // Specified gap
          }}>
            {/* Text "Before you come back" with adjusted position and font weight */}
            <div style={{
              color: '#060606', // Font color
              fontSize: '20px', // Font size remains increased by 4
              fontWeight: '500', // Made the content a little less bold
              position: 'absolute',
              top: '25px', // Pushed up a bit from the previous position
              left: '20px', // Pushed to the right a bit as well
            }}>
              Before you come back
            </div>
            {/* Horizontal line 80px down from the "Before you come back" content, with 8% filling of #000000 */}
            <div style={{
              position: 'absolute',
              top: '105px', // 80px down from the "Before you come back" content
              left: '20px', // Aligned with the start of the text above
              right: '20px', // Ensuring even spacing on both ends
              borderTop: '1px solid rgba(0, 0, 0, 0.08)', // Solid line with 8% opacity of black color
            }}></div>
            {/* "All" text and circle positioned above the line */}
            <div style={{
              color: '#060606', // Font color
              fontSize: '14px', // Font size
              position: 'absolute',
              top: '78px', // Positioned above the line
              left: '32px', // Aligned with the start of the text above
              display: 'flex', // Use flex to align text, circles, and additional texts horizontally
              alignItems: 'center', // Center items vertically
            }}>
              All
              {/* Circle next to "All" with no filling and number 10 inside */}
              <div style={{
                width: '20px', // Circle width
                height: '20px', // Circle height
                border: '2px solid #2B5CE6', // Circle border color
                borderRadius: '50%', // Makes the div a circle
                marginLeft: '5px', // Space between "All" text and the circle
                display: 'flex', // Enables flexbox properties
                justifyContent: 'center', // Centers content horizontally
                alignItems: 'center', // Centers content vertically
              }}>
                <span style={{
                  color: '#2B5CE6', // Font color for the number inside the circle
                  fontSize: '11px', // Font size for the number
                }}>
                  10
                </span>
              </div>
              {/* "Important" text to the right of the circle */}
              <div style={{
                marginLeft: '35px', // 35px to the right of the circle
                color: '#060606', // Matching the font color of "All"
                fontSize: '14px', // Matching the font size of "All"
              }}>
                Important
              </div>
              {/* "Notes" text and circle to the right of "Important" */}
              <div style={{
                marginLeft: '30px', // 30px to the right of "Important"
                color: '#060606', // Matching the font color
                fontSize: '14px', // Matching the font size
                display: 'flex', // Use flex to align text and circle horizontally
                alignItems: 'center', // Center items vertically
              }}>
                Notes
                {/* Circle next to "Notes" */}
                <div style={{
                  width: '20px', // Circle width
                  height: '20px', // Circle height
                  border: '2px solid #2B5CE6', // Circle border color
                  borderRadius: '50%', // Makes the div a circle
                  marginLeft: '5px', // Space between "Notes" text and the circle
                  display: 'flex', // Enables flexbox properties
                  justifyContent: 'center', // Centers content horizontally
                  alignItems: 'center', // Centers content vertically
                }}>
                  <span style={{
                    color: '#2B5CE6', // Font color for the number inside the circle
                    fontSize: '11px', // Font size for the number
                  }}>
                    05
                  </span>
                </div>
              </div>
              {/* "Links" text to the right of the "Notes" circle */}
              <div style={{
                marginLeft: '30px', // 30px to the right of the "Notes" circle
                color: '#060606', // Matching the font color
                fontSize: '14px', // Matching the font size
                display: 'flex', // Use flex to align text and circle horizontally
                alignItems: 'center', // Center items vertically
              }}>
                Links
                {/* Circle next to "Links" */}
                <div style={{
                  width: '20px', // Circle width
                  height: '20px', // Circle height
                  border: '2px solid #2B5CE6', // Circle border color
                  borderRadius: '50%', // Makes the div a circle
                  marginLeft: '5px', // Space between "Links" text and the circle
                  display: 'flex', // Enables flexbox properties
                  justifyContent: 'center', // Centers content horizontally
                  alignItems: 'center', // Centers content vertically
                }}>
                  <span style={{
                    color: '#2B5CE6', // Font color for the number inside the circle
                    fontSize: '11px', // Font size for the number
                  }}>
                    07
                  </span>
                </div>
              </div>
            </div>
            {/* Circle below the line, aligned with its left edge, with a check icon inside */}
            <div style={{
              width: '20px', // Circle width
              height: '20px', // Circle height
              borderRadius: '50%', // Makes the div a circle
              backgroundColor: '#E65F2B', // Circle fill color
              position: 'absolute',
              top: '125px', // Starting position for the first circle
              left: '20px', // Aligned with the left edge of the line
              display: 'flex', // Enables flexbox properties for centering the check icon
              justifyContent: 'center', // Centers content horizontally
              alignItems: 'center', // Centers content vertically
            }}>
              <img src={CheckImage} alt="Check" style={{
                width: '12px', // Adjust the size of the check icon as needed
                height: '12px', // Adjust the size of the check icon as needed
              }}/>
            </div>
            {/* Second Circle with slightly decreased spacing */}
            <div style={{
              width: '20px', // Circle width
              height: '20px', // Circle height
              borderRadius: '50%', // Makes the div a circle
              backgroundColor: '#E65F2B', // Circle fill color
              position: 'absolute',
              top: '172px', // Decreased gap: 47px beneath the first circle (20px height + 27px gap)
              left: '20px', // Aligned with the left edge of the line
              display: 'flex', // Enables flexbox properties for centering the check icon
              justifyContent: 'center', // Centers content horizontally
              alignItems: 'center', // Centers content vertically
            }}>
              <img src={CheckImage} alt="Check" style={{
                width: '12px', // Adjust the size of the check icon as needed
                height: '12px', // Adjust the size of the check icon as needed
              }}/>
            </div>
            {/* Third Circle with slightly decreased spacing */}
            <div style={{
              width: '20px', // Circle width
              height: '20px', // Circle height
              borderRadius: '50%', // Makes the div a circle
              backgroundColor: '#E65F2B', // Circle fill color
              position: 'absolute',
              top: '219px', // Decreased gap: 47px beneath the second circle (20px height + 27px gap)
              left: '20px', // Aligned with the left edge of the line
              display: 'flex', // Enables flexbox properties for centering the check icon
              justifyContent: 'center', // Centers content horizontally
              alignItems: 'center', // Centers content vertically
            }}>
              <img src={CheckImage} alt="Check" style={{
                width: '12px', // Adjust the size of the check icon as needed
                height: '12px', // Adjust the size of the check icon as needed
                marginLeft: '10px', // Positioning the check icon to the left
              }}/>
              <div style={{
                color: '#060606', // Font color set as requested
                fontSize: '10px', // Font size set as requested
                  position: 'absolute',
                  top: '175px', // Aligned with the image
                  left: '32px', // Positioned right next to the image
                }}>
                </div>
              </div>
          </div>
          <div style={{
            position: 'absolute',
            left: '266px',
            top: '395px', // Adjusted for spacing
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            width: 'calc(100% - 266px)',
          }}>
            <div style={{
              width: '872px', // Adjusted to span two boxes and half of the third
              height: '400px', // Height increased by 30px
              backgroundColor: 'rgba(255, 255, 255, 0.34)',
              borderRadius: '14px',
              boxShadow: `0 0 0 1px #EBDFD7`,
              marginBottom: '15px',
              position: 'relative',
              display: 'flex', // Ensures that the child components can fill the space
            }}>
              
              <div style={{ width: '100%', height: '100%' }}>
                <TeachableMachineComponent />
              </div>
              {/* Content inside the new box can be added here */}
            </div>
            {/* New smaller box below the large box */}
            <div style={{
              width: '872px', // Width as specified
              height: '150px', // Height as specified
              backgroundColor: 'rgba(255, 255, 255, 0.34)', // Matching the filling of the other boxes
              borderRadius: '14px', // Matching the corner radius of the other boxes
              boxShadow: `0 0 0 1px #EBDFD7`, // Matching the shadow of the other boxes
              marginTop: '2px', // Space above this box, adjust as needed for your layout
              position: 'relative', // Use relative for positioning within the layout
            }}>
              <AudioVisualizer />
              {/* Content inside the new smaller box can be added here */}
            </div>
          </div>
          {/* Adjusted New Box with specified requirements */}
          <div style={{
            position: 'absolute',
            left: '1158px', // Starts 20px after the big box
            top: '395px', // Positioned at the same top as specified before
            width: '532px', // Corrected width to ensure it aligns with the end of the fourth small box
            height: '400px', // Specified height
            backgroundColor: 'rgba(255, 255, 255, 0.34)', // Matching the beige color
            borderRadius: '14px', // Matching the corner radius
            boxShadow: `0 0 0 1px #EBDFD7`, // Matching the shadow
            marginBottom: '15px', // Specified gap
          }}>
            {/* Text "Before you come back" with adjusted position and font weight */}
            <div style={{
              color: '#060606', // Font color
              fontSize: '20px', // Font size remains increased by 4
              fontWeight: '500', // Made the content a little less bold
              position: 'absolute',
              top: '25px', // Pushed up a bit from the previous position
              left: '20px', // Pushed to the right a bit as well
            }}>
              Before you come back
            </div>
            {/* Horizontal line 80px down from the "Before you come back" content, with 8% filling of #000000 */}
            <div style={{
              position: 'absolute',
              top: '105px', // 80px down from the "Before you come back" content
              left: '20px', // Aligned with the start of the text above
              right: '20px', // Ensuring even spacing on both ends
              borderTop: '1px solid rgba(0, 0, 0, 0.08)', // Solid line with 8% opacity of black color
            }}></div>
            {/* "All" text and circle positioned above the line */}
            <div style={{
              color: '#060606', // Font color
              fontSize: '14px', // Font size
              position: 'absolute',
              top: '78px', // Positioned above the line
              left: '32px', // Aligned with the start of the text above
              display: 'flex', // Use flex to align text, circles, and additional texts horizontally
              alignItems: 'center', // Center items vertically
            }}>
              All
              {/* Circle next to "All" with no filling and number 10 inside */}
              <div style={{
                width: '20px', // Circle width
                height: '20px', // Circle height
                border: '2px solid #2B5CE6', // Circle border color
                borderRadius: '50%', // Makes the div a circle
                marginLeft: '5px', // Space between "All" text and the circle
                display: 'flex', // Enables flexbox properties
                justifyContent: 'center', // Centers content horizontally
                alignItems: 'center', // Centers content vertically
              }}>
                <span style={{
                  color: '#2B5CE6', // Font color for the number inside the circle
                  fontSize: '11px', // Font size for the number
                }}>
                  10
                </span>
              </div>
              {/* "Important" text to the right of the circle */}
              <div style={{
                marginLeft: '35px', // 35px to the right of the circle
                color: '#060606', // Matching the font color of "All"
                fontSize: '14px', // Matching the font size of "All"
              }}>
                Important
              </div>
              {/* "Notes" text and circle to the right of "Important" */}
              <div style={{
                marginLeft: '30px', // 30px to the right of "Important"
                color: '#060606', // Matching the font color
                fontSize: '14px', // Matching the font size
                display: 'flex', // Use flex to align text and circle horizontally
                alignItems: 'center', // Center items vertically
              }}>
                Notes
                {/* Circle next to "Notes" */}
                <div style={{
                  width: '20px', // Circle width
                  height: '20px', // Circle height
                  border: '2px solid #2B5CE6', // Circle border color
                  borderRadius: '50%', // Makes the div a circle
                  marginLeft: '5px', // Space between "Notes" text and the circle
                  display: 'flex', // Enables flexbox properties
                  justifyContent: 'center', // Centers content horizontally
                  alignItems: 'center', // Centers content vertically
                }}>
                  <span style={{
                    color: '#2B5CE6', // Font color for the number inside the circle
                    fontSize: '11px', // Font size for the number
                  }}>
                    05
                  </span>
                </div>
              </div>
              {/* "Links" text to the right of the "Notes" circle */}
              <div style={{
                marginLeft: '30px', // 30px to the right of the "Notes" circle
                color: '#060606', // Matching the font color
                fontSize: '14px', // Matching the font size
                display: 'flex', // Use flex to align text and circle horizontally
                alignItems: 'center', // Center items vertically
              }}>
                Links
                {/* Circle next to "Links" */}
                <div style={{
                  width: '20px', // Circle width
                  height: '20px', // Circle height
                  border: '2px solid #2B5CE6', // Circle border color
                  borderRadius: '50%', // Makes the div a circle
                  marginLeft: '5px', // Space between "Links" text and the circle
                  display: 'flex', // Enables flexbox properties
                  justifyContent: 'center', // Centers content horizontally
                  alignItems: 'center', // Centers content vertically
                }}>
                  <span style={{
                    color: '#2B5CE6', // Font color for the number inside the circle
                    fontSize: '11px', // Font size for the number
                  }}>
                    07
                  </span>
                </div>
              </div>
            </div>
            {/* Circle below the line, aligned with its left edge, with a check icon inside */}
            <div style={{
              width: '20px', // Circle width
              height: '20px', // Circle height
              borderRadius: '50%', // Makes the div a circle
              backgroundColor: '#E65F2B', // Circle fill color
              position: 'absolute',
              top: '125px', // Starting position for the first circle
              left: '20px', // Aligned with the left edge of the line
              display: 'flex', // Enables flexbox properties for centering the check icon
              justifyContent: 'center', // Centers content horizontally
              alignItems: 'center', // Centers content vertically
            }}>
              <img src={CheckImage} alt="Check" style={{
                width: '12px', // Adjust the size of the check icon as needed
                height: '12px', // Adjust the size of the check icon as needed
              }}/>
            </div>
            {/* Second Circle with slightly decreased spacing */}
            <div style={{
              width: '20px', // Circle width
              height: '20px', // Circle height
              borderRadius: '50%', // Makes the div a circle
              backgroundColor: '#E65F2B', // Circle fill color
              position: 'absolute',
              top: '172px', // Decreased gap: 47px beneath the first circle (20px height + 27px gap)
              left: '20px', // Aligned with the left edge of the line
              display: 'flex', // Enables flexbox properties for centering the check icon
              justifyContent: 'center', // Centers content horizontally
              alignItems: 'center', // Centers content vertically
            }}>
              <img src={CheckImage} alt="Check" style={{
                width: '12px', // Adjust the size of the check icon as needed
                height: '12px', // Adjust the size of the check icon as needed
              }}/>
            </div>
            {/* Third Circle with slightly decreased spacing */}
            <div style={{
              width: '20px', // Circle width
              height: '20px', // Circle height
              borderRadius: '50%', // Makes the div a circle
              backgroundColor: '#E65F2B', // Circle fill color
              position: 'absolute',
              top: '219px', // Decreased gap: 47px beneath the second circle (20px height + 27px gap)
              left: '20px', // Aligned with the left edge of the line
              display: 'flex', // Enables flexbox properties for centering the check icon
              justifyContent: 'center', // Centers content horizontally
              alignItems: 'center', // Centers content vertically
            }}>
              <img src={CheckImage} alt="Check" style={{
                width: '12px', // Adjust the size of the check icon as needed
                height: '12px', // Adjust the size of the check icon as needed
              }}/>
            </div>
            {/* Fourth Circle with consistent spacing */}
            <div style={{
              width: '20px', // Circle width
              height: '20px', // Circle height
              borderRadius: '50%', // Makes the div a circle
              backgroundColor: '#E65F2B', // Circle fill color
              position: 'absolute',
              top: '266px', // Consistent gap: 47px beneath the third circle (20px height + 27px gap)
              left: '20px', // Aligned with the left edge of the line
              display: 'flex', // Enables flexbox properties for centering the check icon
              justifyContent: 'center', // Centers content horizontally
              alignItems: 'center', // Centers content vertically
            }}>
              <img src={CheckImage} alt="Check" style={{
                width: '12px', // Adjust the size of the check icon as needed
                height: '12px', // Adjust the size of the check icon as needed
              }}/>
            </div>
            {/* Fifth "circle" border with transparent fill */}
            <div style={{
              width: '20px', // Circle width
              height: '20px', // Circle height
              borderRadius: '50%', // Makes the div a circle
              border: '2px solid rgba(6, 6, 6, 0.64)', // #060606 with 64% opacity border
              backgroundColor: 'transparent', // Transparent fill
              position: 'absolute',
              top: '313px', // Consistent gap: 47px beneath the fourth circle
              left: '20px', // Aligned with the left edge of the line
              display: 'flex', // Enables flexbox properties for centering the content
              justifyContent: 'center', // Centers content horizontally
              alignItems: 'center', // Centers content vertically
            }}>
              {/* If you need to place an icon or text inside this circle, you can do so here */}
            </div>
            {/* Filler text to the right of the first orange circle with increased font size */}
            <div style={{
              position: 'absolute',
              top: '125px', // Aligned with the top of the first orange circle
              left: '50px', // 15px to the right of the orange circle (20px width + 15px gap)
              fontSize: '16px', // Increased font size
              display: 'flex', // Added for inline layout of text and rectangle
              alignItems: 'center', // Center items vertically
            }}>
              Filler text here here here here here.
              {/* Rectangle added to the right of the filler text, with "Approved" text in the middle */}
              <div style={{
                width: '69px', // Rectangle width
                height: '24px', // Rectangle height
                backgroundColor: '#1A932E', // Rectangle color
                opacity: '0.9', // Filling of 18 percent
                borderRadius: '20px', // Corner radius of 20
                marginLeft: '75px', // 75px to the right of the filler text
                display: 'flex', // Use flexbox for centering the text
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically
              }}>
                <span style={{
                  fontSize: '12px', // Font size for "Approved"
                  color: 'black', // Text color, no opacity applied to the text
                }}>
                  Approved
                </span>
              </div>
            </div>
            {/* Filler text to the right of the second orange circle with increased font size */}
            <div style={{
              position: 'absolute',
              top: '172px', // Aligned with the top of the second orange circle
              left: '50px', // 15px to the right of the orange circle (20px width + 15px gap)
              fontSize: '16px', // Increased font size
              display: 'flex', // Added for inline layout of text and rectangle
              alignItems: 'center', // Center items vertically
            }}>
              Filler text here here here here here.
              {/* Rectangle added to the right of the filler text, color changed to #EE201C with "In Review" text */}
              <div style={{
                width: '69px', // Rectangle width
                height: '24px', // Rectangle height
                backgroundColor: '#EE201C', // Rectangle color changed to #EE201C
                opacity: '0.9', // Filling of 18 percent
                borderRadius: '20px', // Corner radius of 20
                marginLeft: '75px', // 75px to the right of the filler text
                display: 'flex', // Use flexbox for centering the text
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically
              }}>
                <span style={{
                  fontSize: '12px', // Font size for "In Review"
                  color: 'black', // Text color
                }}>
                  In Review
                </span>
              </div>
            </div>
            {/* Filler text to the right of the third orange circle with increased font size */}
            <div style={{
              position: 'absolute',
              top: '219px', // Aligned with the top of the third orange circle
              left: '50px', // 15px to the right of the orange circle (20px width + 15px gap)
              fontSize: '16px', // Increased font size
              display: 'flex', // Added for inline layout of text and rectangle
              alignItems: 'center', // Center items vertically
            }}>
              Filler text here here here here here.
              {/* Rectangle added to the right of the filler text, color changed to #EE201C with "In Review" text */}
              <div style={{
                width: '69px', // Rectangle width
                height: '24px', // Rectangle height
                backgroundColor: '#EE201C', // Rectangle color changed to #EE201C
                opacity: '0.9', // Filling of 18 percent
                borderRadius: '20px', // Corner radius of 20
                marginLeft: '75px', // 75px to the right of the filler text
                display: 'flex', // Use flexbox for centering the text
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically
              }}>
                <span style={{
                  fontSize: '12px', // Font size for "In Review"
                  color: 'black', // Text color
                }}>
                  In Review
                </span>
              </div>
            </div>
            {/* Filler text to the right of the fourth orange circle with increased font size */}
            <div style={{
              position: 'absolute',
              top: '266px', // Aligned with the top of the fourth orange circle
              left: '50px', // 15px to the right of the orange circle (20px width + 15px gap)
              fontSize: '16px', // Font size
              display: 'flex', // Added for inline layout of text and rectangle
              alignItems: 'center', // Center items vertically
            }}>
              Filler text here here here here here.
              {/* Rectangle added to the right of the filler text, color changed to #E65F2B with "On Going" text */}
              <div style={{
                width: '69px', // Rectangle width
                height: '24px', // Rectangle height
                backgroundColor: '#E65F2B', // Rectangle color changed to #E65F2B
                opacity: '0.9', // Filling of 18 percent
                borderRadius: '20px', // Corner radius of 20
                marginLeft: '75px', // 75px to the right of the filler text
                display: 'flex', // Use flexbox for centering the text
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically
              }}>
                <span style={{
                  fontSize: '12px', // Font size for "On Going"
                  color: '#000', // Text color
                }}>
                  On Going
                </span>
              </div>
            </div>
            {/* Filler text to the right of the fifth "circle" with increased font size */}
            <div style={{
              position: 'absolute',
              top: '313px', // Aligned with the top of the fifth "circle"
              left: '50px', // 15px to the right of the "circle" (20px width + 15px gap)
              fontSize: '16px', // Font size
              display: 'flex', // Added for inline layout of text and rectangle
              alignItems: 'center', // Center items vertically
            }}>
              Filler text here here here here here.
              {/* Rectangle added to the right of the filler text, color changed to #EE201C with "In Review" text */}
              <div style={{
                width: '69px', // Rectangle width
                height: '24px', // Rectangle height
                backgroundColor: '#EE201C', // Rectangle color changed to #EE201C
                opacity: '0.9', // Filling of 18 percent
                borderRadius: '20px', // Corner radius of 20
                marginLeft: '75px', // 75px to the right of the filler text
                display: 'flex', // Use flexbox for centering the text
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically
              }}>
                <span style={{
                  fontSize: '12px', // Font size for "In Review"
                  color: 'black', // Text color
                }}>
                  In Review
                </span>
              </div>
            </div>
          </div>
          {/* Adjusted New Box with specified requirements */}
          <div style={{
            position: 'absolute',
            right: '20px',
            bottom: '27px',
            width: '532px', // Width adjusted as specified
            height: '150px', // Height specified as 150px
            backgroundColor: 'rgba(255, 255, 255, 0.34)', // Matching the filling of the other boxes
            borderRadius: '14px', // Matching the corner radius of the other boxes
            boxShadow: `0 0 0 1px #EBDFD7`, // Matching the shadow of the other boxes
            marginTop: '417px', // Maintaining consistent spacing with the layout
          }}>
            {/* Display weather data here */}
            {weatherData ? (
              <div style={{ padding: '10px' }}> {/* Added padding for content spacing */}
                <p style={{ margin: 0, fontWeight: 'bold' }}>Weather in {weatherData.location.name}, {weatherData.location.region}</p>
                <p style={{ margin: '5px 0' }}>Temperature: {weatherData.current.temp_c}°C</p>
                <p style={{ margin: '5px 0' }}>Condition: {weatherData.current.condition.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={`https:${weatherData.current.condition.icon}`} alt="Weather Icon" style={{ width: '48px', height: '48px' }} />
                </div>
              </div>
            ) : (
              <p style={{ padding: '10px' }}>Loading weather data...</p>
            )}
          </div>
        </div>
        <MyChatbot isVisible={isChatbotVisible} />
      </div>
    </div>
  );
}
export default App;
