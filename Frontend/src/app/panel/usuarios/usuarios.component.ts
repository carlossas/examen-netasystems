import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilidadesService } from '../../services/utilidades/utilidades.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { Usuario } from '../../models/usuario';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public form_usuario = {
    name: "",
    user: "",
    password: "",
    admin: false,
    language: "es",
    email: "",
    position: "",
    telephone: null,
  }

  public editar: boolean = false;
  public camibarPass: boolean = false;


  constructor(
    public usuariosS: UsuariosService,
    private loading: NgxSpinnerService,
    private authS: AuthService,
    private utilidadesS: UtilidadesService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    
  }


  obtenerUsuarios(){
    this.loading.show();
    this.usuariosS.obtenerUsuarios().subscribe(res=>{
      this.loading.hide();
      if(res.error){
        Swal.fire({
          icon: 'error',
          title: 'Alerta',
          text: "Ocurrió un error en la consulta de los datos: " + res.msg
        })
      }else{
        this.usuariosS.usuarios = res.data;
      }
    }, error=>{
      this.loading.hide();
      Swal.fire({
        icon: 'error',
        title: 'Alerta',
        text: "Ocurrió un error en la consulta de los datos."
      })
    });
  }

 
  public setUser() {
    this.editar = false;
    this.camibarPass = false;

    this.form_usuario = {
      name: "",
      user: "",
      password: "",
      admin: false,
      language: "es",
      email: "",
      position: "",
      telephone: null,
    }
  }


  public crearUsuario(form: NgForm) {

    if(form.valid){

      this.loading.show();
      console.log("--->Creando el usuario", this.form_usuario);
      
      this.usuariosS.crearUsuario(this.form_usuario).subscribe( res=>{
        this.loading.hide();
        if(res.error){
          Swal.fire({
            icon: 'error',
            title: 'Alerta',
            text: "Ocurrió un error al crear el usuario."
          })
          return;
        }
        this.utilidadesS.clickEvent('cerrarModal');
        this.setUser();
        this.obtenerUsuarios();
        this.utilidadesS.alertaShow('Se creo el usuario correctamente.', 'success', 4)
      }, error=>{
        this.loading.hide();
        Swal.fire({
          icon: 'error',
          title: 'Alerta',
          text: "Ocurrió un error al crear el usuario."
        })
      });

    }
    
    
  }

  editarUsuario(){
    console.log("Usuario editar >>", this.form_usuario);
    
    this.loading.show();
    this.usuariosS.editarUsuarios(this.form_usuario, this.camibarPass).subscribe(res=>{
      this.loading.hide();
      if(res.error){
        Swal.fire({
          icon: 'error',
          title: 'Alerta',
          text: "Ocurrió un error al editar el usuario."
        })
        return;
      }else{
        this.camibarPass = false;
        this.utilidadesS.clickEvent('cerrarModal');
        this.setUser();
        this.utilidadesS.alertaShow("Se edito el usuario correctamente.", "success", 4)
      }
    }, error=>{
      this.loading.hide();
      Swal.fire({
        icon: 'error',
        title: 'Alerta',
        text: "Ocurrió un error al editar el usuario."
      })
    });
  }

  asignarUsuario(usuario: Usuario){
    this.form_usuario = usuario;
    this.editar = true;
    this.utilidadesS.clickEvent('abrirModalUser');
  }

  async eliminarUsuario(usuario: Usuario, indice: number){
    let confirmar = await this.esperarConfirmacion(usuario.user);
    if(confirmar){
      this.loading.show();
    
      this.usuariosS.eliminarUsuario(usuario.id).subscribe( res=>{
        this.loading.hide();
  
        if(res.error){
          Swal.fire({
            icon: 'error',
            title: 'Alerta',
            text: "Ocurrió un error al eliminar el usuario."
          })
        }else{
          this.utilidadesS.alertaShow("Se eliminó 1 usuario correctamente.", "success", 4)
          this.usuariosS.usuarios.splice(indice, 1);
        }
      }, err=>{
        this.loading.hide();
        Swal.fire({
          icon: 'error',
          title: 'Alerta',
          text: "Ocurrió un error al eliminar el usuario."
        })
      });
    }
    return;
  }


  public async esperarConfirmacion(usuario: string): Promise<boolean> {
    let confirmar: boolean = false;

    await Swal.fire({
      title: 'Alerta',
      text: `¿Estás seguro de eliminar el usuario '${usuario}'?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.value) {
        confirmar = true;
      }
    });

    return confirmar;

  }

}



