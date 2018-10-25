// DEBUG
var trace = function(msg){ console.log(msg); };

var system;

class Enviroment
{
	constructor()
	{
		this.time_main = {};

		// THROWAWAY
		this.time_temp = {};
		// RECORDED
		this.time_keep = {};

		this.time_light = [];
		this.time_light.push("MORNING");
		this.time_light.push("AFTERNOON");
		this.time_light.push("EVENING");
		this.time_light.push("NIGHT");

		this.time_temp.H = 0;
		this.time_temp.M = 0;
		this.time_temp.S = 0;

		this.time_temp.L = 0;

		// UNITS
		this.time_keep.H = 0;
		this.time_keep.M = 0;
		this.time_keep.S = 0;
		// LIGHT
		this.time_keep.L = 0;
		// LIGHT DESCRIPTION
		this.time_light_type = this.time_light[this.time_keep.L];
	}

	updater()
	{
		this.time_main = new Date();
		this.time_temp.H = this.time_main.getHours();
		this.time_temp.M = this.time_main.getMinutes();
		this.time_temp.S = this.time_main.getSeconds();

		this.writer();
	}

	writer()
	{
		this.timeChange = false;

		if(this.time_keep.H !== this.time_temp.H)
		{
			this.time_keep.H = this.time_temp.H;
			this.timeChange = true;
		}

		if(this.time_keep.M !== this.time_temp.M)
		{
			this.time_keep.M = this.time_temp.M;
			this.timeChange = true;
		}

		if(this.time_keep.S !== this.time_temp.S)
		{
			this.time_keep.S = this.time_temp.S;
			this.timeChange = true;
		}

		if(this.timeChange)
		{
			this.reader();
		}
	}

	checkLight()
	{
		// NIGHT 0 - 4
		if(this.time_keep.H >= 0 && this.time_keep.H <= 4)
		{
			this.time_temp.L = 3;
		}

		// MORNING 5 - 11
		else if(this.time_keep.H >= 5 && this.time_keep.H <= 11)
		{
			this.time_temp.L = 0;
		}

		// AFTERNOON 12 - 16
		else if(this.time_keep.H >= 12 && this.time_keep.H <= 16)
		{
			this.time_temp.L = 1;
		}

		// EVENING 17 - 20
		else if(this.time_keep.H >= 17 && this.time_keep.H <= 20)
		{
			this.time_temp.L = 2;
		}

		// NIGHT
		else
		{
			this.time_temp.L = 3;
		}

		if(this.time_keep.L !== this.time_temp.L)
		{
			this.time_keep.L = this.time_temp.L;

			this.time_light_type = this.time_light[this.time_keep.L];
		}
	}

	// DEBUG ONLY
	reader()
	{
		trace(this.time_keep.H + " // " + this.time_keep.M + " // " + this.time_keep.S + " // " + this.time_light_type);
	}
}

function pageLoad_init()
{
	trace("pageLoad_init();");

	init_main();
}

function init_main()
{
	system = {};

	system.enviroment = new Enviroment();
	system.enterFrameRun = false;
	system.enterFrameLoopList = [];
	system.enterFrameFunct = loop_system_update;

	loop_system_add(enviroment_update);

	loop_system_apply(true);
}

function loop_system_add(funct)
{
	system.enterFrameLoopList.push(funct);
}

function loop_system_apply(run)
{
	if(run)
	{
		if(!system.enterFrameRun)
		{
			system.enterFrameRun = true;

			window.requestAnimationFrame(system.enterFrameFunct);
		}
	}

	else
	{
		system.enterFrameRun = false;

		window.cancelAnimationFrame(system.enterFrameFunct);
	}
}

function loop_system_update()
{
	for(var i in system.enterFrameLoopList)
	{
		system.enterFrameLoopList[i]();
	}

	if(system.enterFrameRun)
	{
		window.requestAnimationFrame(system.enterFrameFunct);
	}
}

function enviroment_update()
{
	system.enviroment.updater();
}



