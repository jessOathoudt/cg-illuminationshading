#version 300 es

precision highp float;

in vec3 vertex_position; 
in vec3 vertex_normal; 


uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color; 
uniform vec3 camera_position; 
uniform float material_shininess; 
uniform mat4 model_matrix; 
uniform mat4 view_matrix; 
uniform mat4 projection_matrix; 

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;

void main() {
    
    
    //for(int i = )
         gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);
        vec3 N = normalize(vertex_normal);
        vec3 V = normalize(camera_position - vertex_position);
        vec3 L = normalize(light_position - vertex_position);
        vec3 R = normalize(-(reflect(L, N)));
        ambient = light_ambient;
        diffuse = light_color * max(0.0, dot(N, L));
        specular = light_color * pow(max(0.0, dot(R, V)), material_shininess);
    //}

}
