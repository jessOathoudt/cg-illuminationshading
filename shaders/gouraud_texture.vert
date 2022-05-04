#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;
in vec2 vertex_texcoord;

uniform vec3 light_ambient;
uniform vec3 light_position[10];
uniform vec3 light_color[10];
uniform vec3 camera_position;
uniform float material_shininess;
uniform vec2 texture_scale;
uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;
out vec2 frag_texcoord;

void main() {
    diffuse = vec3(0.0, 0.0, 0.0);
    specular = vec3(0.0, 0.0, 0.0);
    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);
    frag_texcoord = vertex_texcoord * texture_scale;
    vec3 N = normalize(vertex_normal);
    vec3 V = normalize(camera_position - vertex_position);

    for (int i = 0; i < 10 ; i++) {
        vec3 L = normalize(light_position[i] - vertex_position);
        vec3 R = normalize(-(reflect(L, N)));

        diffuse += light_color[i] * max(0.0, dot(N, L));
        specular += light_color[i] * pow(max(0.0, dot(R, V)), material_shininess);
    }
    ambient = light_ambient;
    
}
