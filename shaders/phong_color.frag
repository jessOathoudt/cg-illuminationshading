#version 300 es
precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n

out vec4 FragColor;


void main() {


    vec3 N = frag_normal;
    vec3 V = normalize(camera_position - frag_pos);
    vec3 L = normalize(light_position - frag_pos);
    vec3 R = normalize((2.0 * dot(N, L) *  N) - L);

    vec3 ambient = light_ambient*material_color;
    vec3 diffuse = light_color*material_color*dot(N, L);
    vec3 specular = light_color*material_specular*pow(dot(R, V), material_shininess);

<<<<<<< HEAD

    vec3 finalColor = ambient + diffuse + specular;
=======
    vec3 finalColor = ambient + diffuse;
>>>>>>> e5d565f36c9339b0e1761f80618678de21cadd69
    FragColor = vec4(finalColor, 1.0);
}