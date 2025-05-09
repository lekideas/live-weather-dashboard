import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import matplotlib
matplotlib.use("module://matplotlib_inline.backend_inline")

# Randomized parameters
g = 9.81
l1, l2 = np.random.uniform(0.5, 1.5, 2)
th1_0, th2_0 = np.random.uniform(0, np.pi, 2)
omega1_0, omega2_0 = 0.0, 0.0
dt = 0.02
t = np.arange(0, 20, dt)

# Derivatives for double pendulum
def deriv(state):
    θ1, ω1, θ2, ω2 = state
    delta = θ2 - θ1
    denom = 2 - np.cos(delta)**2
    dω1 = (
        g*(np.sin(θ2)*np.cos(delta) - 2*np.sin(θ1))
        - np.sin(delta)*(ω2**2*l2 + ω1**2*l1*np.cos(delta))
    ) / (l1*denom)
    dω2 = (
        (2*ω1**2*l1 + 2*g*np.sin(θ1) - ω2**2*l2*np.cos(delta))
        * np.sin(delta)
    ) / (l2*denom)
    return np.array([ω1, dω1, ω2, dω2])

# Integrate with RK4
states = np.zeros((len(t), 4))
states[0] = [th1_0, omega1_0, th2_0, omega2_0]
for i in range(len(t)-1):
    s = states[i]
    k1 = deriv(s)
    k2 = deriv(s + 0.5*dt*k1)
    k3 = deriv(s + 0.5*dt*k2)
    k4 = deriv(s + dt*k3)
    states[i+1] = s + dt*(k1 + 2*k2 + 2*k3 + k4)/6

# Positions
x1 = l1*np.sin(states[:,0])
y1 = -l1*np.cos(states[:,0])
x2 = x1 + l2*np.sin(states[:,2])
y2 = y1 - l2*np.cos(states[:,2])

# Plot setup
fig, ax = plt.subplots(figsize=(6,6))
lim = l1 + l2 + 0.2
ax.set_xlim(-lim, lim)
ax.set_ylim(-lim, lim)
ax.set_aspect('equal')
line, = ax.plot([], [], lw=2)
bob1 = ax.plot([], [], 'o', markersize=10)[0]
bob2 = ax.plot([], [], 'o', markersize=10)[0]
label = ax.text(0.05, 0.95, '', transform=ax.transAxes, va='top')

def init():
    line.set_data([], [])
    bob1.set_data([], [])
    bob2.set_data([], [])
    label.set_text('')
    return line, bob1, bob2, label

def update(i):
    ptsx = [0, x1[i], x2[i]]
    ptsy = [0, y1[i], y2[i]]
    line.set_data(ptsx, ptsy)
    bob1.set_data(x1[i], y1[i])
    bob2.set_data(x2[i], y2[i])
    label.set_text(f'l1={l1:.2f}, l2={l2:.2f}\\n'
                   f'th1_0={th1_0:.2f}, th2_0={th2_0:.2f}')
    return line, bob1, bob2, label

anim = FuncAnimation(fig, update, frames=len(t), init_func=init,
                     blit=True, interval=dt*1000)

# Generate JS animation HTML
html = anim.to_html5_video()
