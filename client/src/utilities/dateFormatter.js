const formatDate = (date, format) => {
    const formatOptions = {
     modalDate: { weekday: 'long', month: 'long', day: 'numeric' },
     date: { day: '2-digit', month: '2-digit', year: 'numeric'},
     hour: { hour: '2-digit', minute: '2-digit', second: '2-digit' }
    }

    const options = formatOptions[format] || {};
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));

  };

export { formatDate };