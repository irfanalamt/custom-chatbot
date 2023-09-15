import {useState} from 'react';
import IntentEditor from './IntentEditor';

const SetupNlp = ({userDetails, goToHome}) => {
  const [data, setData] = useState([
    {
      intentName: 'Greeting Intent',
      utterances: ['Hi', 'Hello', 'Hey', 'Good morning', 'Good afternoon'],
      intentType: 'FAQ',
      answers: ['Hello!', 'Hi there!'],
    },
    {
      intentName: 'Weather Inquiry',
      utterances: [
        "What's the weather",
        'How hot is it',
        'Is it going to rain',
      ],
      intentType: 'Flow',
      flowFile: {
        content: 'Dummy Flow Content for Weather Inquiry',
        isValidated: true,
      },
    },
    {
      intentName: 'Booking Intent',
      utterances: ['Book a ticket', 'Reserve a seat', 'I want to book a hotel'],
      intentType: 'Flow',
      flowFile: {
        content: 'Dummy Flow Content for Booking Intent',
        isValidated: false,
      },
    },
    {
      intentName: 'Help Intent',
      utterances: ['Help', 'Support', 'Can you assist me'],
      intentType: 'FAQ',
      answers: ['How can I assist you today?', 'I am here to help!'],
    },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentIntent, setCurrentIntent] = useState({
    intentName: '',
    intentType: '',
    utterances: [],
  });

  const handleAddIntent = () => {
    if (!currentIntent.intentType || !currentIntent.intentName) {
      return;
    }

    let modifiedIntent = {...currentIntent};

    if (currentIntent.intentType === 'Flow') {
      modifiedIntent.flowFile = {
        content: '',
        isValidated: false,
      };
    } else {
      modifiedIntent.answers = [];
    }

    setData([...data, modifiedIntent]);
    setShowModal(false);
  };

  const handleEditIntent = (index) => {
    setCurrentIntent(data[index]);
    setEditMode(true);
  };

  return (
    <div className='p-6'>
      {editMode ? (
        <IntentEditor
          intent={currentIntent}
          handleCancel={() => setEditMode(false)}
        />
      ) : (
        <>
          <div>
            <button
              className='bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300'
              onClick={goToHome}>
              Go Back
            </button>
            <h2 className='text-3xl text-center'>Setup NLP files</h2>
          </div>
          <div className='w-full mb-2'>
            <button
              className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mb-4 ml-2 rounded transition duration-300'
              onClick={() => {
                setCurrentIntent({
                  intentName: '',
                  intentType: '',
                  utterances: [],
                });
                setShowModal(true);
              }}>
              Add New Intent
            </button>
          </div>
          <table className='w-full bg-white rounded-lg overflow-hidden shadow-lg'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='py-3 px-4 text-gray-700  font-medium text-left'>
                  Intent Name
                </th>
                <th className='py-3 px-4 text-gray-700  font-medium text-left'>
                  Intent Type
                </th>
                <th className='py-3 px-4 text-gray-700  font-medium text-left'></th>
                <th className='py-3 px-4 text-gray-700  font-medium text-left'></th>
                <th className='py-3 px-4 text-gray-700  font-medium text-left'></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className='py-2 px-4  text-gray-900'>
                    {item.intentName}
                  </td>
                  <td className='py-2 px-4  text-gray-900'>
                    {item.intentType}
                  </td>
                  <td className='py-2 px-4  text-gray-900'>
                    {item.utterances?.length > 0
                      ? `${item.utterances.length} x Utterances`
                      : '0 x Utterance'}
                  </td>
                  <td className='py-2 px-4  text-gray-900 flex items-center space-x-2'>
                    {item.intentType === 'Flow' ? (
                      <>
                        Flow File
                        {item.flowFile?.isValidated ? (
                          <span className='text-green-500 ml-2'>
                            (Validated)
                          </span>
                        ) : null}
                      </>
                    ) : (
                      <>
                        {item.answers?.length > 0
                          ? `${item.answers.length} x Answers`
                          : '0 x Answer'}
                      </>
                    )}
                  </td>

                  <td className='py-2 pl-4  text-gray-900'>
                    <button
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                      onClick={() => handleEditIntent(index)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {showModal && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 transition-opacity backdrop-blur-md'
              aria-hidden='true'>
              <div className='absolute inset-0 bg-gray-500 opacity-60'></div>
            </div>

            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'>
              &#8203;
            </span>

            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='bg-white px-6 py-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <h3
                      className='text-lg leading-6 font-medium text-gray-900'
                      id='modal-title'>
                      Add New Intent
                    </h3>
                    <div className='mt-4 space-y-2'>
                      <input
                        type='text'
                        placeholder='Intent Name'
                        className='w-full px-3 py-2 border rounded-lg'
                        value={currentIntent.intentName}
                        onChange={(e) =>
                          setCurrentIntent({
                            ...currentIntent,
                            intentName: e.target.value,
                          })
                        }
                      />
                      <select
                        className='w-full px-3 py-2 border rounded-lg'
                        value={currentIntent.intentType}
                        onChange={(e) =>
                          setCurrentIntent({
                            ...currentIntent,
                            intentType: e.target.value,
                          })
                        }>
                        <option value=''>Select Intent Type</option>
                        <option value='FAQ'>FAQ</option>
                        <option value='Flow'>Flow</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse'>
                <button
                  type='button'
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={handleAddIntent}>
                  Add
                </button>
                <button
                  type='button'
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
                  onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetupNlp;
