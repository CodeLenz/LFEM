var documenterSearchIndex = {"docs":
[{"location":"#LFEM.jl","page":"Home","title":"LFEM.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Basic routines for FEM *","category":"page"},{"location":"#Solvers","page":"Home","title":"Solvers","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Solve_linear","category":"page"},{"location":"#LFEM.Solve_linear","page":"Home","title":"LFEM.Solve_linear","text":"Solve the linear system K(x)U(x)=F\n\nSolve_linear(mesh::Mesh, x::Vector{Float64}, kparam::Function)\n\nwhere \n\nx is a ne x 1 vector of design varibles \nkparam(xe): R->R is the material parametrization (SIMP like)\n\nReturns:\n\nU = displacement vector (dim*nn x 1)\nF = Force vector (dim*nn x 1)\nChol = Cholesky decomposition of K, just free positions (mesh.free_dofs)\n\n\n\n\n\nSolve the linear system KU=F\n\nSolve_linear(mesh::Mesh)\n\nReturns:\n\nU = displacement vector (dim*nn x 1)\nF = Force vector (dim*nn x 1)\nChol = Cholesky decomposition of K, just free positions (mesh.free_dofs)\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"Solve_modal","category":"page"},{"location":"#LFEM.Solve_modal","page":"Home","title":"LFEM.Solve_modal","text":"Solve the modal problem (M(x) - λK(x))ϕ(x) = 0\n\nSolve_modal(mesh::Mesh, x::Vector{Float64}, kparam::Function, mparam::Function, nev=4, which=:SM)\n\nwhere \n\nx is a ne x 1 vector of design varibles \nkparam(xe): R->R is the material parametrization for K (SIMP like)\nmparam(xe): R->R is the material parametrization for M (SIMP like)\nnev is the number of eigenvalues and eigenvectors to compute\nwhich is the range (:SM is smaller in magnitude, for example)\n\nReturns:\n\nλ = eigenvalues vector (nev x 1)\nmodes = matrix dim*nn x nev with the eigenvectors\n\n\n\n\n\nSolve the modal problem (M - λK)ϕ = 0\n\nSolve_modal(mesh::Mesh,nev=4, which=:SM)\n\nwhere      nev is the number of eigenvalues and eigenvectors to compute     which is the range (:SM is smaller in magnitude, for example)\n\nReturns:\n\nλ = eigenvalues vector (nev x 1)\nmodes = matrix dim*nn x nev with the eigenvectors\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"Solve_harmonic","category":"page"},{"location":"#LFEM.Solve_harmonic","page":"Home","title":"LFEM.Solve_harmonic","text":"Solve the harmonic problem Kd(x,w)Ud(x,w) = F(w),  where Kd(x,w)= K(x)-M(x)w^2 + imwC(x)\n\nSolve_harmonic(mesh::Mesh, w::Float64, x::Vector{Float64}, kparam::Function, mparam::Function)\n\nwhere \n\nw is the angular frequency\nx is a ne x 1 vector of design varibles \nkparam(xe): R->R is the material parametrization for K (SIMP like)\nmparam(xe): R->R is the material parametrization for M (SIMP like)\n\nReturns:\n\nUd = displacement vector (ComplexF64) of size dim*nn x 1\nLU = LU factorization of Kd(x,w) (just free positions)\n\n\n\n\n\nSolve the harmonic problem Kd(w)Ud(w) = F(w),  where Kd(w)= K-Mw^2 + imwC\n\nSolve_harmonic(mesh::Mesh, w::Float64)\n\nwhere \n\nw is the angular frequency\n\nReturns:\n\nUd = displacement vector (ComplexF64) of size dim*nn x 1\nLU = LU factorization of Kd(x,w) (just free positions)\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"Solve_newmark","category":"page"},{"location":"#LFEM.Solve_newmark","page":"Home","title":"LFEM.Solve_newmark","text":"Solve the transient problem M(x)A(x,t) + C(x)V(x,t) + K(x,t)U(x,t) = F(t),  using Newmark-beta method.\n\nSolve_newmark(mesh::Mesh, f!::Function, gls::Matrix{Int64}, \n              ts::Tuple{Float64, Float64}, Δt::Float64,\n              x::Vector{Float64}, kparam::Function, mparam::Function;\n              U0=Float64[], V0=Float64[], β=1/4, γ=1/2)\n\nwhere \n\nts is Tupple with initial and end time (Ti,Tf)\nΔt is (fixed) time step\nx is a ne x 1 vector of design varibles \nkparam(xe): R->R is the material parametrization for K (SIMP like)\nmparam(xe): R->R is the material parametrization for M (SIMP like)\nverbose is false or true\n\nf!(t,F,mesh) must be a function of t, mesh and F where F is dim*nn x 1,\n            Example: \n\n            function f!(t,F,mesh::Mesh)\n                        P = Point_load(mesh)\n                        F.= cos(2*t)*P \n            end   \n\ngls is a matrix with [node gl ;\n                      node gl ...] to monitor\n\nReturn three arrays of size ng x nt, where ng is size(gls,1) and nt is the  number of time steps (length of t0:Δt:tf)\n\nA_U displacements\nA_V velocities\nA_A accelerations\n\nA_t is a vector of size nt x 1 with discrete times\ndofs is a vector with the (global) monitored dofs\n\n\n\n\n\nSolve the transient problem MA(t) + CV(t) + K(t)U(t) = F(t),  using Newmark-beta method.\n\nSolve_newmark(mesh::Mesh, f!::Function, gls::Matrix{Int64}, \n              ts::Tuple{Float64, Float64}, Δt::Float64;\n              U0=Float64[], V0=Float64[], β=1/4, γ=1/2)\n\nwhere \n\nts is Tupple with initial and end time (Ti,Tf)\nΔt is (fixed) time steps\nverbose is false or true\n\nf!(t,F,mesh) must be a function of t, mesh and F where F is dim*nn x 1,\n            Example: \n\n            function f!(t,F,mesh::Mesh)\n                        P = Point_load(mesh)\n                        F.= cos(2*t)*P \n            end   \n\ngls is a matrix with [node gl ;\n                      node gl ...] to monitor\n\nReturn three arrays of size ng x nt, where ng is size(gls,1) and nt is the  number of time steps (length of t0:Δt:tf)\n\nA_U displacements\nA_V velocities\nA_A accelerations\n\nA_t is a vector of size nt x 1 with discrete times\ndofs is a vector with the (global) monitored dofs\n\n\n\n\n\n","category":"function"},{"location":"#Global","page":"Home","title":"Global","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Global_K","category":"page"},{"location":"#LFEM.Global_K","page":"Home","title":"LFEM.Global_K","text":"Assembly the global stiffness matrix.\n\nGlobal_K(mesh::Mesh, x::Vector{Float64}, kparam::Function)\n\nwhere kparam(x) can be, for example\n\nfunction kparam(x,p=1.0)     x^p end\n\nfor a SIMP like material parametrization.\n\n\n\n\n\nAssembly the global stiffness matrix.\n\nGlobal_K(mesh::Mesh)\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"Global_M","category":"page"},{"location":"#LFEM.Global_M","page":"Home","title":"LFEM.Global_M","text":"Assembly the global mass matrix.\n\n Global_M(mesh::Mesh, x=Float64[], mparam::Function)\n\nwhere mparam(x) can be, for example\n\nfunction param(x,p=2.0,cut=0.1)     s = x     if x<cut        s = x^p     end     return s end\n\nfor a SIMP like material parametrization.\n\n\n\n\n\nAssembly the global mass matrix.\n\n Global_M(mesh::Mesh)\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"Stresses","category":"page"},{"location":"#LFEM.Stresses","page":"Home","title":"LFEM.Stresses","text":"Return stresses for the entire mesh. This version evaluates only in the central point.\n\nStresses(mesh::Mesh,U::Vector{T};x=Float64[],sparam::Function)\n\nThe output is a matrix ne x ncol, where ncol is 1 for :truss2D and 3D, 3 for :solid2D and 6 for :solid3D\n\nFunction sparam(x) is used to parametrize stress. One possibility is \n\nfunction sparam(x,p=1.0,q=0.0)         x^(p=q) end\n\n\n\n\n\nReturn stresses for the entire mesh. This version evaluates only in the central point.\n\nStresses(mesh::Mesh,U::Vector{T})\n\nThe output is a matrix ne x ncol, where ncol is 1 for :truss2D and 3D, 3 for :solid2D and 6 for :solid3D\n\n\n\n\n\n","category":"function"},{"location":"#Truss2D","page":"Home","title":"Truss2D","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"K_truss2D","category":"page"},{"location":"#LFEM.K_truss2D","page":"Home","title":"LFEM.K_truss2D","text":"Local stiffness matrix for truss2D        K_truss2D(mesh::Mesh2D,ele::Int64)\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"M_truss2D","category":"page"},{"location":"#LFEM.M_truss2D","page":"Home","title":"LFEM.M_truss2D","text":"Local mass matrix for truss2D (lumped)        M_truss2D(mesh::Mesh2D,ele::Int64)\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"B_truss2D","category":"page"},{"location":"#LFEM.B_truss2D","page":"Home","title":"LFEM.B_truss2D","text":"Local B matrix for truss2D        B_truss2D(mesh::Mesh2D,ele::Int64)\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"B_truss2D","category":"page"},{"location":"","page":"Home","title":"Home","text":"Stress_truss2D","category":"page"},{"location":"#LFEM.Stress_truss2D","page":"Home","title":"LFEM.Stress_truss2D","text":"Local stress for truss2D        Stress_truss2D(mesh::Mesh2D,ele::Int64,U::Vector{Float64})\n\nIt returns stress as [sxx] for compatibility with solid elements.\n\n\n\n\n\n","category":"function"},{"location":"#Truss3D","page":"Home","title":"Truss3D","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"K_truss3D","category":"page"},{"location":"#LFEM.K_truss3D","page":"Home","title":"LFEM.K_truss3D","text":"Local stiffness matrix for truss3D        K_truss3D(mesh::Mesh3D,ele::Int64)\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"M_truss3D","category":"page"},{"location":"#LFEM.M_truss3D","page":"Home","title":"LFEM.M_truss3D","text":"Local mass matrix for truss3D (lumped)        M_truss3D(mesh::Mesh3D,ele::Int64)\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"B_truss3D","category":"page"},{"location":"#LFEM.B_truss3D","page":"Home","title":"LFEM.B_truss3D","text":"Local B matrix for truss3D        B_truss3D(mesh::Mesh3D,ele::Int64)\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"B_truss3D","category":"page"},{"location":"","page":"Home","title":"Home","text":"Stress_truss3D","category":"page"},{"location":"#LFEM.Stress_truss3D","page":"Home","title":"LFEM.Stress_truss3D","text":"Local stress for truss3D        Stress_truss3D(mesh::Mesh3D,ele::Int64,U::Vector{Float64})\n\nIt returns stress as [sxx] for compatibility with solid elements.\n\n\n\n\n\n","category":"function"},{"location":"#Solid2D","page":"Home","title":"Solid2D","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"dN_solid2D","category":"page"},{"location":"","page":"Home","title":"Home","text":"Jacobian_solid2D","category":"page"},{"location":"","page":"Home","title":"Home","text":"B_solid2D","category":"page"},{"location":"#LFEM.B_solid2D","page":"Home","title":"LFEM.B_solid2D","text":"B Matrix (with additional bublle functions) for 2D elements     B_solid2D(r::T,s::T,x::Vector{T},y::Vector{T}) where T\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"K_solid2D","category":"page"},{"location":"#LFEM.K_solid2D","page":"Home","title":"LFEM.K_solid2D","text":"Stiffness Matrix for (incompatible) 2D element     K_solid2D(m::Mesh2D,ele::Int64)\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"N_solid2D","category":"page"},{"location":"","page":"Home","title":"Home","text":"M_solid2D","category":"page"},{"location":"#LFEM.M_solid2D","page":"Home","title":"LFEM.M_solid2D","text":"Consistent mass matrix for solid 2D     M_solid2D(m::Mesh2D,ele::Int64,lumped=false)\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"Stress_solid2D","category":"page"},{"location":"#LFEM.Stress_solid2D","page":"Home","title":"LFEM.Stress_solid2D","text":"Local stress for solid 2D ((Not expanding bubble DOFs)     Stress_solid2D(r::Float64,s::Float64,mesh::Mesh2D,ele::Int64,U::Vector{Float64})\n\n\n\n\n\n","category":"function"},{"location":"#Solid3D","page":"Home","title":"Solid3D","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"dN_solid3D","category":"page"},{"location":"","page":"Home","title":"Home","text":"Jacobian_solid3D","category":"page"},{"location":"","page":"Home","title":"Home","text":"B_solid3D","category":"page"},{"location":"#LFEM.B_solid3D","page":"Home","title":"LFEM.B_solid3D","text":"B Matrix (with additional bublle functions) for 3D elements     B_solid3D(r::T,s::T,t::T,x::Vector{T},y::Vector{T},z::Vector{T}) where T\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"K_solid3D","category":"page"},{"location":"#LFEM.K_solid3D","page":"Home","title":"LFEM.K_solid3D","text":"Stiffness Matrix for (incompatible) 3D element     K_solid3D(m::Mesh3D,ele::Int64)\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"N_solid3D","category":"page"},{"location":"","page":"Home","title":"Home","text":"M_solid3D","category":"page"},{"location":"#LFEM.M_solid3D","page":"Home","title":"LFEM.M_solid3D","text":"Consistent mass matrix for solid 3D     M_solid3D(m::Mesh3D,ele::Int64,lumped=false)\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"Stress_solid3D","category":"page"},{"location":"#LFEM.Stress_solid3D","page":"Home","title":"LFEM.Stress_solid3D","text":"Local stress for solid 3D ((Not expanding bubble DOFs)     Stress_solid3D(r::Float64,s::Float64,t::Float64,mesh::Mesh2D,ele::Int64,U::Vector{Float64})\n\n\n\n\n\n","category":"function"}]
}
