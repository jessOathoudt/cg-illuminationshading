#version 300 es
precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;

uniform vec3 light_ambient;
uniform vec3 light_position[10];
uniform vec3 light_color[10];
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n

out vec4 FragColor;


void main() {
    vec3 diffuse = vec3(0.0, 0.0, 0.0);
    vec3 specular = vec3(0.0, 0.0, 0.0);

    vec3 N = frag_normal;
    vec3 V = normalize(camera_position - frag_pos);
    vec3 ambient = light_ambient*material_color;
    for (int i = 0; i < 10; i++) {

        vec3 L = normalize(light_position[i] - frag_pos);
        vec3 R = normalize(-reflect(L, N));

        
        diffuse += light_color[i]*material_color* max(0.0, dot(N, L));
        specular += light_color[i]*material_specular*pow(max(0.0, dot(R, V)), material_shininess);
    }

    vec3 finalColor = min(ambient + diffuse + specular, 1.0);
    FragColor = vec4(finalColor, 1.0);
}