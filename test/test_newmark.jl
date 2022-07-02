@testset "Solve_newmark" begin

    # Load Simply supported 2D from TMeshes
    mesh = Simply_supported2D(6,6)

    # We need to define a function that modifies a force
    # vector according to time t. Lets use the same point
    # load as the static example, but with a cos(2*t) 
    function f!(t,F,mesh)
        P  = Point_load(mesh)
        F .= cos(2*t)*P
    end

    # And a list of nodes/dofs to monitor. Lets monitor 
    # the same DOF as the load
    node = Int(mesh.nbc[1,1])
    dof  = Int(mesh.nbc[1,2])
    monitor = [node dof]

    # timespan [s]
    tspan = (0.0,5.0)

    # Interval
    dt = 1E-2

    # Solve the transient problem
    @test try  Solve_newmark(mesh,f!,monitor,tspan,dt)
            true
    catch err  
            false
    end
    @isinferred Solve_harmonic(mesh,w)


    # Load Simply supported 2D from TMeshes (solid)
    mesh = Simply_supported2D(6,6,:solid2D)

    # We need to define a function that modifies a force
    # vector according to time t. Lets use the same point
    # load as the static example, but with a cos(2*t) 
    function f1!(t,F,mesh)
        P  = Point_load(mesh)
        F .= cos(2*t)*P
    end

    # And a list of nodes/dofs to monitor. Lets monitor 
    # the same DOF as the load
    node = Int(mesh.nbc[1,1])
    dof  = Int(mesh.nbc[1,2])
    monitor = [node dof]

    # timespan [s]
    tspan = (0.0,5.0)

    # Interval
    dt = 1E-2

    # Solve the transient problem
    @test try  Solve_newmark(mesh,f1!,monitor,tspan,dt)
            true
    catch err  
            false
    end
    @isinferred Solve_harmonic(mesh,w)


    # Load Simply supported 3D from TMeshes (truss)
    mesh = Simply_supported3D(2,2,2)

    # We need to define a function that modifies a force
    # vector according to time t. Lets use the same point
    # load as the static example, but with a cos(2*t) 
    function f2!(t,F,mesh)
        P  = Point_load(mesh)
        F .= cos(2*t)*P
    end

    # And a list of nodes/dofs to monitor. Lets monitor 
    # the same DOF as the load
    node = Int(mesh.nbc[1,1])
    dof  = Int(mesh.nbc[1,2])
    monitor = [node dof]

    # timespan [s]
    tspan = (0.0,5.0)

    # Interval
    dt = 1E-2

    # Solve the transient problem
    @test try  Solve_newmark(mesh,f2!,monitor,tspan,dt)
            true
    catch err  
            false
    end
    @isinferred Solve_harmonic(mesh,w)

    # Load Simply supported 3D from TMeshes (solid)
    mesh = Simply_supported3D(2,2,2,:solid3D)

    # We need to define a function that modifies a force
    # vector according to time t. Lets use the same point
    # load as the static example, but with a cos(2*t) 
    function f3!(t,F,mesh)
        P  = Point_load(mesh)
        F .= cos(2*t)*P
    end

    # And a list of nodes/dofs to monitor. Lets monitor 
    # the same DOF as the load
    node = Int(mesh.nbc[1,1])
    dof  = Int(mesh.nbc[1,2])
    monitor = [node dof]

    # timespan [s]
    tspan = (0.0,5.0)

    # Interval
    dt = 1E-2

    # Solve the transient problem
    @test try  Solve_newmark(mesh,f3!,monitor,tspan,dt)
            true
    catch err  
            false
    end
    @isinferred Solve_harmonic(mesh,w)
    
end


@testset "Solve_newmark (parametrization)" begin

    # Load Simply supported 2D from TMeshes
    mesh = Simply_supported2D(6,6)

    # Define x, kparam and mparam
    x = ones(Get_ne(mesh))
    kparam(xe::Float64,p=3.0)= xe^p
    mparam(xe::Float64,p=2.0,cut=0.1)= ifelse(xe>=cut,xe,xe^p)

    # We need to define a function that modifies a force
    # vector according to time t. Lets use the same point
    # load as the static example, but with a cos(2*t) 
    function f4!(t,F,mesh)
        P  = Point_load(mesh)
        F .= cos(2*t)*P
    end

    # And a list of nodes/dofs to monitor. Lets monitor 
    # the same DOF as the load
    node = Int(mesh.nbc[1,1])
    dof  = Int(mesh.nbc[1,2])
    monitor = [node dof]

    # timespan [s]
    tspan = (0.0,5.0)

    # Interval
    dt = 1E-2

    # Solve the transient problem
    @test try  Solve_newmark(mesh,f4!,monitor,tspan,dt)
            true
    catch err  
            false
    end
    @isinferred Solve_harmonic(mesh,w)


    # Load Simply supported 2D from TMeshes (solid)
    mesh = Simply_supported2D(6,6,:solid2D)

    # Define x
    x = ones(Get_ne(mesh))

    # We need to define a function that modifies a force
    # vector according to time t. Lets use the same point
    # load as the static example, but with a cos(2*t) 
    function f5!(t,F,mesh)
        P  = Point_load(mesh)
        F .= cos(2*t)*P
    end

    # And a list of nodes/dofs to monitor. Lets monitor 
    # the same DOF as the load
    node = Int(mesh.nbc[1,1])
    dof  = Int(mesh.nbc[1,2])
    monitor = [node dof]

    # timespan [s]
    tspan = (0.0,5.0)

    # Interval
    dt = 1E-2

    # Solve the transient problem
    @test try  Solve_newmark(mesh,f5!,monitor,tspan,dt)
            true
    catch err  
            false
    end
    @isinferred Solve_harmonic(mesh,w)


    # Load Simply supported 3D from TMeshes (truss)
    mesh = Simply_supported3D(2,2,2)

    # Define x
    x = ones(Get_ne(mesh))

    # We need to define a function that modifies a force
    # vector according to time t. Lets use the same point
    # load as the static example, but with a cos(2*t) 
    function f6!(t,F,mesh)
        P  = Point_load(mesh)
        F .= cos(2*t)*P
    end

    # And a list of nodes/dofs to monitor. Lets monitor 
    # the same DOF as the load
    node = Int(mesh.nbc[1,1])
    dof  = Int(mesh.nbc[1,2])
    monitor = [node dof]

    # timespan [s]
    tspan = (0.0,5.0)

    # Interval
    dt = 1E-2

    # Solve the transient problem
    @test try  Solve_newmark(mesh,f6!,monitor,tspan,dt)
            true
    catch err  
            false
    end
    @isinferred Solve_harmonic(mesh,w)

    # Load Simply supported 3D from TMeshes (solid)
    mesh = Simply_supported3D(2,2,2,:solid3D)

    # Define x
    x = ones(Get_ne(mesh))

    # We need to define a function that modifies a force
    # vector according to time t. Lets use the same point
    # load as the static example, but with a cos(2*t) 
    function f7!(t,F,mesh)
        P  = Point_load(mesh)
        F .= cos(2*t)*P
    end

    # And a list of nodes/dofs to monitor. Lets monitor 
    # the same DOF as the load
    node = Int(mesh.nbc[1,1])
    dof  = Int(mesh.nbc[1,2])
    monitor = [node dof]

    # timespan [s]
    tspan = (0.0,5.0)

    # Interval
    dt = 1E-2

    # Solve the transient problem
    @test try  Solve_newmark(mesh,f7!,monitor,tspan,dt)
            true
    catch err  
            false
    end
    @isinferred Solve_harmonic(mesh,w)
    
end

   