#version 300 es

precision highp float;

in vec3 vertex_position; 
in vec3 vertex_normal; 


uniform vec3 light_ambient;
uniform vec3 light_position[10];
uniform vec3 light_color[10]; 
uniform vec3 camera_position; 
uniform float material_shininess; 
uniform mat4 model_matrix; 
uniform mat4 view_matrix; 
uniform mat4 projection_matrix; 

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;

void main() {
    diffuse = vec3(0.0, 0.0, 0.0);
    specular = vec3(0.0, 0.0, 0.0);

    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);
    vec3 N = normalize(transpose(inverse(mat3(model_matrix)))* vertex_normal);
    vec3 POS = vec3(model_matrix * vec4(vertex_position, 1.0));
    vec3 V = normalize(camera_position - POS);

    for (int i = 0; i < light_position.length(); i++) {
        vec3 L = normalize(light_position[i] - POS);
        vec3 R = normalize(reflect(-L, N));

        vec3 D = light_color[i] * max(0.0, dot(N, L));
        vec3 S = light_color[i] * pow(max(0.0, dot(R, V)), material_shininess);

        diffuse += D;
        specular += S;
    }


    ambient = light_ambient;
    

}
