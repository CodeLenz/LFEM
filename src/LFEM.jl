module LFEM

using LinearAlgebra, SparseArrays
using Plots, Arpack
using BMesh, LMesh

include("load.jl")
include("base.jl")
include("elements/truss2D.jl")
include("elements/truss3D.jl")
include("global.jl")
include("drivers.jl")
include("analysis/linear.jl")
include("analysis/modal.jl")
include("analysis/harmonic.jl")
include("show.jl")
include("gmsh.jl")

export Point_load
export Expand_vector, Expand_vector!
export K_truss2D, M_truss2D, B_truss2D, Stress_truss2D
export K_truss3D, M_truss3D, B_truss3D, Stress_truss3D
export Global_K, Global_M
export Solve_linear, Solve_modal, Solve_harmonic
export Stress, Keg_truss, Meg_truss
export plot
export Gmsh_init, Gmsh_nodal_scalar, Gmsh_element_scalar, Gmsh_nodal_vector

end # module
