@testset "Solid3D" begin

    #    Valid inputs (no error) 
    #
    #  Bar in tension (EPT)
    #
    # xy plane
    #
    # >------------ -> F/4
    #  |         2| 
    # X------------ -> F/4
    #       5     o
    #            ---
    # depth = 1.0m
    #
    nn = 8
    ne = 1
    coord = [0.0 0.0 0.0;
             5.0 0.0 0.0;
             5.0 2.0 0.0;
             0.0 2.0 0.0;
             0.0 0.0 1.0;
             5.0 0.0 1.0;
             5.0 2.0 1.0;
             0.0 2.0 1.0
             ]
    connect = [1 2 3 4 5 6 7 8]
    Lx = 1.0
    Ly = 1.0
    Lz = 1.0
    nx = 1
    ny = 1
    nz = 1
    etype = :solid3D

    # Bmesh
    b3 = Bmesh3D(etype,nn,ne,coord,connect,Lx,Ly,Lz,nx,ny,nz)

    # Essential boundary conditions
    ebc = [1 1 0.0 ;  # support in z (plane z=0)
           1 2 0.0 ;
           1 3 0.0 ; 
           2 2 0.0 ;
           2 3 0.0 ;
           3 3 0.0 ;
           4 1 0.0;
           4 3 0.0 ; 
           5 1 0.0 ;
           8 1 0.0]

    # Natural boundary conditions
    nbc = [2 1 25.0 ; 
           3 1 25.0 ;
           6 1 25.0 ; 
           7 1 25.0 ]

    # Material and geometry
    materials = [Material(Ex=100.0,νxy=0.3,density=10.0)]
    geometries = [Geometry()]
           
    # Mesh
    m3 = Mesh3D(b3,materials,geometries,ebc,nbc)

    # Total mass is density*volume
    mass = 10.0*5*2*1

    # Mass matrix
    M = Meg_solid(m3,1)
    
    # trace of M should be equal mass
    @test isapprox(tr(M), mass)

    # Displacement
    U,_ = Solve_linear(m3)

    # reference is u = FL/EA, where A = height*depth
    refu = 100*5/(100.0 * 2 * 1)
    @test isapprox(U[3*(2-1)+1],refu)
    @test isapprox(U[3*(3-1)+1],refu)
    @test isapprox(U[3*(6-1)+1],refu)
    @test isapprox(U[3*(7-1)+1],refu)
   
    # vertical displacements are proportional to Poisson's ratio
    # exx = F/EA
    exx = 100/(100.0*2*1)
    eyy = -0.3*exx
    ezz = -0.3*exx
    uy = eyy*2.0
    uz = ezz*1.0
    @test isapprox(U[3*(3-1)+2],uy)
    @test isapprox(U[3*(4-1)+2],uy)

    @test isapprox(U[3*(6-1)+3],uz)
    @test isapprox(U[3*(7-1)+3],uz)

end
