const propiedades = [
    {
      nombre: "Casa de campo",
      descripcion:  "Un lugar ideal para descansar de la ciudad",
      src:
        "https://www.construyehogar.com/wp-content/uploads/2020/02/Dise%C3%B1o-casa-en-ladera.jpg",
      cuartos: 2,
      metros: 170
    },

    {
      nombre: "Casa de playa",
      descripcion:  "Despierta tus días oyendo el oceano",
      src:
        "https://media.chvnoticias.cl/2018/12/casas-en-la-playa-en-yucatan-2712.jpg",
      cuartos: 2,
      metros: 130
    },

    {
      nombre: "Casa en el centro",
      descripcion: "Ten cerca de ti todo lo que necesitas",
      src:
        "https://fotos.perfil.com/2018/09/21/trim/950/534/nueva-york-09212018-366965.jpg",
      cuartos: 1,
      metros: 80
    },

    { 
      nombre: "Casa rodante",
      descripcion:  "Conviertete en un nómada del mundo sin salir de tu casa",
      src:
        "https://cdn.bioguia.com/embed/3d0fb0142790e6b90664042cbafcb1581427139/furgoneta.jpg",
      cuartos: 1,
      metros: 6
    },

    { 
      nombre: "Departamento",
      descripcion:  "Desde las alturas todo se ve mejor",
      src:
        "https://www.adondevivir.com/noticias/wp-content/uploads/2016/08/depto-1024x546.jpg",
      cuartos: 3,
      metros: 200
    },


    { 
      nombre: "Mansión",
      descripcion: "Vive una vida lujosa en la mansión de tus sueños ",
      src:
        "https://resizer.glanacion.com/resizer/fhK-tSVag_8UGJjPMgWrspslPoU=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CUXVMXQE4JD5XIXX4X3PDZAVMY.jpg",
      cuartos: 5,
      metros: 500
    }];

  
    function crearTemplatePropiedad(propiedad) {
      return `
      <div class="propiedad">
          <div class="img" style="background-image: url('${propiedad.src}')"></div>
          <section>
              <h5>${propiedad.nombre}</h5>
              <div class="d-flex justify-content-between">
                  <p>Cuartos: ${propiedad.cuartos}</p>
                  <p>Metros: ${propiedad.metros}</p>
              </div>
              <p class="my-3">${propiedad.descripcion}</p>
              <button class="btn btn-info">Ver más</button>
          </section>
      </div>
      `;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
      const propiedadesDiv = document.querySelector('.propiedades');
      const totalPropiedadesElement = document.getElementById('totalPropiedades');
  
      propiedades.forEach((propiedad) => {
          const propiedadHTML = crearTemplatePropiedad(propiedad);
          propiedadesDiv.insertAdjacentHTML('beforeend', propiedadHTML);
      });
  
      totalPropiedadesElement.textContent = propiedades.length;
  });
  
  document.getElementById('index').addEventListener('click', buscarPropiedades);
  
  let ultimaCantidadCuartos = null;
  
  function buscarPropiedades() {
      const cantidadCuartosInput = document.getElementById('cantidadCuartosInput');
      const metrosDesdeInput = document.getElementById('metrosDesdeInput');
      const metrosHastaInput = document.getElementById('metrosHastaInput');
  
      if (cantidadCuartosInput.value === '' || metrosDesdeInput.value === '' || metrosHastaInput.value === '') {
          alert('Debes ingresar todos los datos!!');
          return;
      }
  
      const cantidadCuartos = parseInt(cantidadCuartosInput.value);
      const metrosDesde = parseInt(metrosDesdeInput.value);
      const metrosHasta = parseInt(metrosHastaInput.value);
  
      if (cantidadCuartos < 0 || metrosDesde < 0 || metrosHasta < 0) {
          alert('Mínimo de cuartos es O, intenta nuevamente');
          return;
      }
  
      if (cantidadCuartos < 1 || cantidadCuartos > 5) {
          alert('Mínimo de cuartos es 5, intenta nuevamente');
          return;
      }
  
      const propiedadesDiv = document.querySelectorAll('.propiedades .propiedad');
      let propiedadesVisibles = 0;
      let seEncontroPropiedad = false;
      let totalPropiedades = propiedades.length; 
  
      propiedadesDiv.forEach((propiedadDiv) => {
          const cuartos = parseInt(propiedadDiv.querySelector('.d-flex.justify-content-between p:first-child').textContent.split(':')[1]);
          const metros = parseInt(propiedadDiv.querySelector('.d-flex.justify-content-between p:last-child').textContent.split(':')[1]);
  
          const cercaCuartos = Math.abs(cuartos - cantidadCuartos) <= 1;
          const cercaMetros = metros >= metrosDesde && metros <= metrosHasta;
  
          const cambioCantidadCuartos = cantidadCuartos !== ultimaCantidadCuartos;
  
          if (cercaCuartos && cercaMetros) { 
              propiedadDiv.style.display = 'block';
              seEncontroPropiedad = true;
              propiedadesVisibles++;
          } else {
              propiedadDiv.style.display = 'none';
          }
  
          if (cambioCantidadCuartos) {
              ultimaCantidadCuartos = cantidadCuartos;
          }
      });
  
      totalPropiedades = propiedadesVisibles; 
  
      if (!seEncontroPropiedad) {
          alert('Lo sentimos, no tenemos lo que buscas');
      }
  
      const totalPropiedadesElement = document.getElementById('totalPropiedades');
      totalPropiedadesElement.textContent = totalPropiedades; 
  }
  
  document.getElementById('resetButton').addEventListener('click', reiniciarFiltros);
  
  function reiniciarFiltros() {
      const cantidadCuartosInput = document.getElementById('cantidadCuartosInput');
      const metrosDesdeInput = document.getElementById('metrosDesdeInput');
      const metrosHastaInput = document.getElementById('metrosHastaInput');
  
      cantidadCuartosInput.value = '';
      metrosDesdeInput.value = '';
      metrosHastaInput.value = '';
  
      const propiedadesDiv = document.querySelectorAll('.propiedades .propiedad');
  
      propiedadesDiv.forEach((propiedadDiv) => {
          propiedadDiv.style.display = 'block';
      });
  
      const totalPropiedadesElement = document.getElementById('totalPropiedades');
      totalPropiedadesElement.textContent = propiedades.length;
      ultimaCantidadCuartos = null;
  }