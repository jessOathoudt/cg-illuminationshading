#version 300 es

precision mediump float;

in vec3 ambient;
in vec3 diffuse;
in vec3 specular;
in vec2 frag_texcoord;

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks
uniform sampler2D image;        // use in conjunction with Ka and Kd

out vec4 FragColor;

void main() {

    //how to implement final color into texture
    

    vec3 finalColor = (ambient * material_color) + (diffuse * material_color) + (specular * material_specular);
    
    FragColor = texture(image, frag_texcoord);
}
