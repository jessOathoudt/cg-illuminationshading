#version 300 es

precision mediump float;

in vec3 ambient;
in vec3 diffuse;
in vec3 specular;
in vec2 frag_texcoord;

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks
uniform sampler2D image_elem;        // use in conjunction with Ka and Kd

out vec4 FragColor;

void main() {


    //image = 
    vec3 finalColor=ambient+diffuse+specular;
    FragColor = texture(image_elem, frag_texcoord) * vec4(finalColor, 1.0);
}
