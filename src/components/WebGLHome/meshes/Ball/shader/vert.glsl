#pragma glslify: cnoise2 = require(glsl-noise/classic/2d);
// #pragma glslify: snoise2 = require(glsl-noise/simplex/2d);
// #pragma glslify: pnoise2 = require(glsl-noise/periodic/2d);

uniform float u_time;
uniform float u_speed;
uniform float u_amp;

varying vec3 vViewPosition;


#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#pragma glslify: cnoise2 = require(glsl-noise/classic/2d);

void main() {

	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#include <begin_vertex>
	#include <displacementmap_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>

	vNormal = normal;

  float displacement = u_amp * cnoise2( vec2( position * 0.05 ) + u_time * u_speed );
  vec3 newPosition = position + normal * displacement;

  mvPosition = modelViewMatrix * vec4( position, 1.0 );
  vViewPosition = - mvPosition.xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

}
