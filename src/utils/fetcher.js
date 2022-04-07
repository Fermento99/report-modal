
const postEcho = async(e) => {
  if (e.message === 'cancel') return false;

  if (!e.email) throw Error('Email missing')
  if (!e.reportName) throw Error('Report name missing')

  const data = { 
    shledule: e.shledule,
    email: e.email,
    reportName: e.reportName
  };

  switch (e.shledule) {
    case 'no-repeat': 
      break;
    case 'date': 
      data.day = e.day;
      data.time = e.time;
      break;
    case 'daily':
      data.time = e.time;
      break;
    case 'weekly':
      data.day = e.day;
      data.time = e.time;
      break;
    default: throw Error('unexpected shledule type');
  }

  return await fetch('https://postman-echo.com/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => {
    if (res.status === 200) return res.json();
    return false
  })
};

export { postEcho };