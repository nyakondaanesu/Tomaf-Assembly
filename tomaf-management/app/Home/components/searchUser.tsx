import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const SearchUser = () => {
  return (
    <>
      <div className="flex flex-col w-full items-center  min-h-fit bg-slate-950 items-center justify-center ">
        <div className="flex flex-col mt-5 mb-5 ">
          <div className=" w-full max-w-lg rounded-lg bg-gray-900 p-5 text-white ">
            <div className="flex items-center space-x-3">
              <img src="members.png" alt="Member" height={30} width={30} />
              <h1 className="font-bold">Total Members</h1>
            </div>
            <h4 className="text-xl mt-3">2,543</h4>
          </div>

          <div className="flex mt-5 ">
            <Input type="text" placeholder="search member..." className="" />
            <Button
              type="submit"
              className="bg-gray-900 ml-1 hover:bg-blue-600"
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACuklEQVR4nO2Zy05TURSGNwNx6oTWcBmgj+AAxMsrmCiYQk2I+gAmqLEhAZ0BL2DiSB2YkMaBWsJYixNvb+DEqTrCiEKrn1l0nbg9aaAb1ml76vmTk5708v/rb/dae+1V5zJk6D4Ax4FrwGPgA/AV2NHrC/BeX7sK5F23ATgPVIAarUPe+wI41w0GTgLrXnB14BUwB4wBOeCIXnI/DtwEqvreCGvAiU6ZKALfNJDvwBIwEPB5MbYMbCnHJjCdbNQxAIvet7kKDLkDAhgGyh7fwkG5ggDcU8Hfet9nxHsD+NUWMzSWEyo4mQD/lGemYM3vJ3aUE3cSEWnolLycGU1CIKpOq+bk/+r0eTlTSWKfQCvMiCl5c70hrYSCs5bEstkJlsxI99eU0ix4btl21HQDa3mfMNCVfaau7U3OgvC6fjMvTSIM095Q7VkLMmnyBHMm0YVp31LthxZk0sUKxkyiC9OeUO23FmTSitPO/PC086r92YJsW8n6TaIL0z6q2j97xchmryytj5bJPm4SXZj2GdXe6JXy+8CCTIYJgqpJdGHar1X7otU6jVqUw7cK4S1KDThmRSrTDsGyCWFrmiuqWbYkPa2kPzrQxp+yJo9a+bLVOX2Pg9VT1XqWhMCoHj8FJXOBvzrzqiGTycGkRKZVRAYEUwnwX/aGDxes+eNiC56ZksUy0+U075mQx6JNxK2ZiXJm+BBcI15O+JDSO2MbefMACl7ObOkZOxe4T6xoJdxtDGPz4MhM8mNULQCVmHBVW4sJ3Uz79crrc7f1CFuPjV0H5RfomBmBjGxk2hH4t4IcD57Em9E9zBRcu6DLZRZ4BLzTErqtm9sn4A1wX5flwD7VsbNmjOfAtSZmrrgeMlN0aQM9ZmbyfzAz41JqZiczk5ICsOjSCOCSt8zuujSDRs605+/sDBncLv4AqVXBkihc3DUAAAAASUVORK5CYII="
                alt="search--v1"
                height={20}
                width={20}
              ></img>
            </Button>
            <Button
              type="submit"
              className="bg-gray-900 ml-1 hover:bg-blue-600"
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACD0lEQVR4nO3ZPYxMURjG8bssEdlmG0FCKEgoSGhIfBRIRENDRUNHIauS1Sh1VKuiEJ1KFKIgEhEKGpWEgpAQEvH9ER8/ucm7cldi5s7uGXvu5v7LyTnP+zzznrlzzrlF0ZIxuKE53OoUpFEU3YIUmaNuEAwXmYLhOkFux5g7GCoyA0PhreR+p4EL8DAGXse8IhMwF1fD2yMs6jZhCZ7EhMuY89/c/gPMxqXw9AzL6k5cgRcx8SJmFdMEBnA+vLzCql4F1uBNCJRCA31z2znE2fDwFusmK7QBH0LoTHKn3eufitqfsHmqYtvwJQRHk7nsXvdE1PyGnalEd+N7CB9LItq53pGo9QN7U4vvx0/8wqGk4hPrHKjUOdivIocr39S+PujvqXR+JLX+38VGK2t3V0Ld7fga2sdT6dZ9mnzGlgR6GytPx9NpXNZ/vo9F4XdYPwWttZX/q7G0TuuHORcGXmP1JDRW4uW07yBM3AM9x/Ie5i7F08qebrC/bnvblT7G4hpz8txlY355htY7d7M796ic3Hogz5OoINW4aaMNkhvapZUZ2o5khrYjmaHtSGZoO5IZ2o5khpnWEWyqM67IFdwMj+V15wUsbGqQQRyNu66SjzhZXlA0Ksg4ZSeiI2VnxI3JjsYFGae8TsWDym/nSryjbFaQynIbqSy3940M0mG5NTPIONiKe7j258OWGchvgmC6Bgc3VskAAAAASUVORK5CYII="
                alt="filter--v1"
                width={15}
                height={15}
              ></img>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchUser;
