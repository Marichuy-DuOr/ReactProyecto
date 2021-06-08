var socket = io.connect('http://localhost:4000', { 
  'forceNew': true
}); 
socket.on('logueos', function(data) { 
  console.log(data);
  render(data);
});
function render (data) { 
  var html = data.map(function(elem, index) { 
    return(`<div>
            <strong>${elem.email}</strong>: 
            <em>${elem.date}</em> </div>`);
  }).join(" "); 
  document.getElementById('logueos').innerHTML = html; 
} 
function addLogueo(e) { 
  var logueo = { 
    email: document.getElementById('elEmail').value, 
    date: document.getElementById('laDate').value 
  }; 
  socket.emit('new-logueo', logueo); return false; 
}
